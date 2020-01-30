const express = require('express');
const router = express.Router();
const services = require('../services');
const lessonRoom = require('../sockets/lesson');

router.post('/create', async function (req, res) {
  try {
    const userId = req.session.userId;

    let lesson = await services.lesson.createLesson(userId, req.body.incomingUser);

    res.send(lesson)
  } catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
});

router.post('/connect', async function (req, res) {
  try {
    let uniqueLessonId = req.body.uniqueLessonId;
    let userId = req.session.userId;
    let lesson = await services.lesson.checkUsers(uniqueLessonId, userId);

    if (lesson) {
      console.log(!!lesson)
      // global.io.on('connection', socket => {
      //   console.log('new user connected from routes with ID: ' + socket.id);
      //   socket.join(uniqueLessonId);
      //   console.log('connected')
      // })

      res.send()
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})


module.exports = router;
