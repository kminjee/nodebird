const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Hashtag, Image, User, Post, Comment } = require('../models');


/* 특정 해시태그 게시글 전체 불러오기 */
router.get('/:hashtag', async (req, res, next) => {
  try {
    const where = { };
    if (parseInt(req.query.lastId, 10)) { 
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } 
    }
    const posts = await Post.findAll({
      where,
      limit: 10,  // 10개만 가져옴
      order: [['createdAt', 'DESC']],
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.hashtag) }
      }, {
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']]
        }]
      }, {
        model: User,
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
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;