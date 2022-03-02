const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads 폴더가 존재하지 않으므로 새로 생성합니다.')
  fs.mkdirSync('uploads');
}


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { // 민지.png
      const ext = path.extname(file.originalname); // .png (확장자 추출)
      const basename = path.basename(file.originalname, ext) // 민지
      done(null, basename + '_' + new Date().getTime() + ext) // 민지1342325.png (파일명 중복 막기위해 newDate 추가)
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

// 글 등록 --------------------------------------------------------------------------------------------------------
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g)
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
        where: { name: tag.slice(1).toLowerCase() }
      }))); // [[노드, true], [리액트, true]]
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지를 여러개 올라면 imgae: [또리1.png, 또리2.png] 
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {  // 이미지를 한개만 올리면 image: 또리1.png (배열로 감싸지지 않고 주소만 가져옴)
        const images = await Image.create({ src: req.body.image });
        await post.addImages(images);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image
      }, {
        model: Comment, // 댓글 작성자
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,  // 게시글 작성자
        attributes: ['id', 'nickname']
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id']
      }]
    })
    res.status(201).json(fullPost); // 프론트로 돌려줌
  } catch (err) {
    console.error(err);
    next(err);
  }
})


// 이미지 업로드 --------------------------------------------------------------------------------------------------
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files); // console에 업로드가 어떻게 됐는지 정보들을 확인할 수 있고
  res.json(req.files.map((v) => v.filename)); // 어디로 업로드 됐는지에 대한 파일명을 다시 프론트에게 전달해준다.
})


// 리트윗 --------------------------------------------------------------------------------------------------------
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // 동적으로 바뀌는 부분은 : 을 붙여준다.
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet'
      }]
    })
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.')
    }
    // 리트윗한 게시글을 본인이 다시 리트윗하는 경우 & 본인 게시글을 남이 리트윗했는데 그 리트윗을 본인이 다시 리트윗하는 경우는 막음.
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.uesr.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.')
    }
    // 리트윗의 리트윗
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId
      }
    })
    if (exPost) {
      return res.status(403).send('이미 리트윗 하였습니다.')
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet'
    })
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id']
      }]
    })
    res.status(201).json(retweetWithPrevPost); // 프론트로 돌려줌
  } catch (err) {
    console.error(err);
    next(err);
  }
})


// 댓글 등록 ------------------------------------------------------------------------------------------------------
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // 동적으로 바뀌는 부분은 : 을 붙여준다.
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.')
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }]
    })
    res.status(201).json(fullComment); // 프론트로 돌려줌
  } catch (err) {
    console.error(err);
    next(err);
  }
})


// 좋아요 등록 ------------------------------------------------------------------------------------------------------
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
})


// 좋아요 삭제  --------------------------------------------------------------------------------------------------------
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
})


// 글 삭제 --------------------------------------------------------------------------------------------------------
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId,
        UserId: req.user.id
      }
    })
    res.json({ PostId: parseInt(req.params.postId, 10) })
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;