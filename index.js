require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const {checkUser, setAuthorizationHeader} = require('./middlewares');

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  allowedHeaders: 'Content-Type',
  credentials: true,
  exposedHeaders: 'Authorized'
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({
  cookie: {maxAge: 60000 * 60},
  secret: process.env.APPLICATION_TOKEN,
  saveUninitialized: false,
  resave: true
}));

app.use(setAuthorizationHeader);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profiles');
const friendRouter = require('./routes/friends')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(checkUser); //check auth token
app.use('/profiles', profileRouter);
app.use('/friends', friendRouter);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(3000, () => console.log('Server started listening on port 3000!'));