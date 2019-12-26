const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'sdsSDAfdgh',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.listen(3000, () => console.log('Server started listening on port 3000!'))