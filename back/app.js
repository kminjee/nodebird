const express = require('express'); 
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express(); 
db.sequelize.sync()
  .then(() => { console.log('DB 연결 성공!'); })
  .catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(cors({  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060')
  origin: true,
  credentials: true
}));

app.use('/', express.static(path.join(__dirname, 'uploads'))) // express의 staic이라는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('hello express')
});

app.get('/', (req, res) => {
  res.send('hello api')
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3030, () => {
  console.log('3030 서버 실행중...')
});