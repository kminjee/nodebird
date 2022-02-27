const express = require('express');
const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

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
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }]
    })
    res.status(201).json(fullPost); // 프론트로 돌려줌
  } catch (err) {
    console.error(err);
    next(err);
  }
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

router.delete('/', (req, res) => {
  res.json({ id: 1 })
})

module.exports = router;