require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const checkLessonUser = require('./services/lesson/checkUsers')

const {checkUser, setAuthorizationHeader} = require('./middlewares');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//TODO: create redis for THIS
let users = {};


io.on('connection', (socket) => {
  console.log('new user with id: ', socket.id)

  socket.on('send-notebook-text', (txt, room) => {
    socket.broadcast.to(room).emit('notebook-text', {txt, from: socket.id})
  });

  socket.on('join', (room, userId) => {
    let lesson = checkLessonUser(room, userId)

    if (lesson) {
      socket.join(room)
    }
  });

  socket.on('invite-to-lesson', payload => {
    io.to(users[payload.to]).emit('incoming-call', {lessonId: payload.lessonId, fromFullName: payload.fromFullName, fromUserId: payload.fromUserId})
  })

  socket.on('accept-incoming-call', payload => {
    console.log(payload);
    io.to(users[payload.fromUserId]).emit('outgoing-call', payload.accepted)
  })

  socket.on('privateMessagePCSignaling', ({ desc, to, from, room }) => {
    io.to(users[to]).emit('privateMessagePCSignaling', ({desc, to, from}))
  })
});

app.use(cors({
  origin: ['http://192.168.1.109:8080', 'http://192.168.1.127:8080', 'http://localhost:8080'],
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

app.use((req, res, next) => {
  if(req.session.userId) {
    req.session.socketId = req.cookies.io;
    users[req.session.userId] = req.session.socketId
  }
  next()
})


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profiles');
const friendRouter = require('./routes/friends');
const lessonRouter = require('./routes/lessons');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(checkUser); //check auth token
app.use('/profiles', profileRouter);
app.use('/friends', friendRouter);
app.use('/lessons', lessonRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


server.listen(3000, () => console.log('Server started listening on port 3000!'));