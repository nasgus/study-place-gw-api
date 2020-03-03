const express = require('express');
const router = express.Router();
const services = require('../services');
const lessonRoom = require('../sockets/lesson');
const lessonDecorator = require('../decorators/lessonDecorator');


router.get('/', async function (req, res) {
  const userId = req.session.userId;

  try {
    let lessons = await services.lesson.getLessons(userId);
    let decoratedLessons = await lessonDecorator(lessons, userId);
    res.send(decoratedLessons)
  } catch (e) {
    res.sendStatus(500);
    console.log(e)
  }
});

router.post('/create', async function (req, res) {
  try {
    const userId = req.session.userId;

    let lesson = await services.lesson.createLesson(userId, req.body.incomingUser, req.body.title);

    res.send(lesson)
  } catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
});

router.get('/connect/:uniqueLessonId', async function (req, res) {
  try {
    let uniqueLessonId = req.params.uniqueLessonId;
    let userId = req.session.userId;
    let lesson = await services.lesson.checkUsers(uniqueLessonId, userId);

    if (lesson) {
      let lessonUsers = {
        me: +lesson.outgoingUser === +userId ? lesson.outgoingUser : lesson.incomingUser,
        you: +lesson.outgoingUser === +userId ? lesson.incomingUser : lesson.outgoingUser
      }

      res.send(lessonUsers)
    }
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
});

router.get('/notebook/:uniqueLessonId', async function (req, res) {
  try {
    let uniqueLessonId = req.params.uniqueLessonId;


    res.download(Buffer.from('asdasdasd'), 'txt.txt')
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

module.exports = router;
