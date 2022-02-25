const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

router.post('/login', (req, res, next) => {
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
      return res.json(user); // 정상적으로 로그인되면 프론트엔드로 json형태의 user정보를 전달
    })
  })(req, res, next)
});


router.post('/', async (req, res, next) => {
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

module.exports = router;