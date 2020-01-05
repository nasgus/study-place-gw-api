const express = require('express');
const router = express.Router();
const services = require('../services');

router.post('/accept', async function (req, res) {
  try {
    const userId = req.session.userId;

    await services.friend.acceptFriend(req.body.friendId, userId);

    res.sendStatus(200)
  } catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
});

router.post('/create', async function (req, res) {
  const userId = req.session.userId;

  try {
    await services.friend.createFriend(userId, req.body.friendId);

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500);
    console.log(e)
  }

});

router.delete('/decline', async function (req, res) {
  const userId = req.session.userId;

  try {
    await services.friend.declineFriend(userId, req.body.friendId);

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500);
    console.log(e)
  }

});

module.exports = router;
