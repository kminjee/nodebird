const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();


router.get('/', async (req, res, next) => {
  console.log(req.headers)
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'] // 전체 데이터 중에 비밀번호만 빼고 가져온다는 뜻
        },  
        include: [{
          model: Post,
          attributes: ['id'] // 전체 데이터들의 id값만 가져온다는 뜻
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id']
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id']
        }]
      });
      res. status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});



// 특정 사용자 데이터 불러오기 --------------------------------------------------------------------------------
router.get('/:userId', async (req, res, next) => {
  console.log(req.headers)
  try {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.params.userId },
        attributes: {
          exclude: ['password']
        },  
        include: [{
          model: Post,
          attributes: ['id']
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id']
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id']
        }]
      });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON(); // 시퀄라이즈에서 보내준 데이터는 json이 아니므로 json으로 형번환을 한번 거친다.
      data.Posts = data.Posts.length; // 개인정보침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res. status(200).json(fullUserWithoutPassword);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// 특정 사용자 게시글 전체 불러오기 --------------------------------------------------------------------------------
router.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.id };
    if (parseInt(req.query.lastId, 10)) { 
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } 
    }
    const posts = await Post.findAll({
      where,
      limit: 10,  // 10개만 가져옴
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id']
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image
        }]
      }]
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});



// isNotLoggedIn이 있으면 회원가입하지 않은 사람들만 이 경로로 가능
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {  // 서버 에러가 생기면 에러 메시지 리턴
      console.log(err);
      return next(err);
    }
    if (info) { // 클라이언트 에러가 생기면 reason 메시지 리턴 (비번이 틀렸다거나, 존재하지 않는 사용자거나)
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => { // 성공하면 passport에서 로그인을 시도
      if (loginErr){  // 만약 passport 로그인 과정에서 에러가 나면
        console.log(err)
        return next(loginErr); 
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'] // 전체 데이터 중에 비밀번호만 빼고 가져온다는 뜻
        },  
        include: [{
          model: Post
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers'
        }]
      });
      return res.status(200).json(fullUserWithoutPassword); // 정상적으로 로그인되면 프론트엔드로 json형태의 user정보를 전달
    });
  })(req, res, next);
});


router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 이메일입니다.');
    };
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    }); 
    res.status(201).send('ok');
  } catch (err) {
    console.log(err);
    next(err);  // status 500 
  }
});

// isLoggedIn 이 있으면 로그인 되어있는 사람만 가능
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname // 2. 닉네임을 프론트에서 받은 닉네임으로 수정
    }, {
      where: { id: req.user.id }  // 1. 내 아이디의
    })
    res.status(200).json({ nickname: req.body.nickname })
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// PATCH /user/1/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    await user.addFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /user/1/follow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    await user.removeFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /user/follow/2
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    await user.removeFollowings(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }})  // 나를 먼저 찾고
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    const followers = await user.getFollowers() // 내 팔로워 가져오기
    res.status(200).json(followers)
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }})
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.')
    }
    const followings = await user.getFollowings()
    res.status(200).json(followings)
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;