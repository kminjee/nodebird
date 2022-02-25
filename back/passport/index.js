const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 쿠카와 매칭할 유저의 id값을 저장하는 것
  });

  passport.deserializeUser(async (id, done) => { // 여기는 반대로 id를 통해 DB에 있는 정보를 가져옴
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
}