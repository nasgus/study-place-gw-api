require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

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
  cookie: {maxAge: 60000},
  secret: process.env.APPLICATION_TOKEN,
  saveUninitialized: false,
  resave: true
}));
app.use((req, res, next) => {
  if (req.session.userId) {
    res.setHeader('Authorized', req.session.userId)
  } else {
  }
  next()
})

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(3000, () => console.log('Server started listening on port 3000!'));