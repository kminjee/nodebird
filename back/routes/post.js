const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads 폴더가 존재하지 않으므로 새로 생성합니다.')
  fs.mkdirSync('uploads');
}


router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    })
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


// 이미지 업로드 router /post/images
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
})
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
  console.log(req.files); // console에 업로드가 어떻게 됐는지 정보들을 확인할 수 있고
  res.json(req.files.map((v) => v.filename)); // 어디로 업로드 됐는지에 대한 파일명을 다시 프론트에게 전달해준다.
})


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