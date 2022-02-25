const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');  // 이름을 LocalStrategy로 하는 이유는 카카오나 구글 이름에 맞게 바꾸려고?
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ // 이메일 여부 판단
        where: { email }
      });
      if (!user) {  // 이메일이 존재하지 않을 때
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' });  // done(서버에러, 성공, 클라이언트에러)
      }

      const result = await bcrypt.compare(password, user.password); // 이메일이 존재하면서 비밀번호가 일치할 때
      if (result) {
        return done(null, user); // 유저 정보 리턴
      }

      return done(null, false, { reason: '비밀번호가 일치하지 않습니다.' });  // 비밀번호가 일치하지 않을 때

    } catch (err) {
      console.log(err);
      return done(err);
    }
  }));
} 
