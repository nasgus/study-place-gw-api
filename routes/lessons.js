const express = require('express');
const router = express.Router();
const services = require('../services');

router.post('/create', async function (req, res) {
  try {
    console.log(req.body)

    const userId = req.session.userId;

    let lesson = await services.lesson.createLesson(userId, req.body.incomingUser)

    res.send(lesson)
  } catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
});


module.exports = router;
