const express = require('express');
const router = express.Router();
const services = require('../services');

router.get('/me', async function (req, res) {
  try {
    const userId = req.session.userId;

    let profile = await services.profile.getProfileByUserId(userId);

    res.send(profile)
  } catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
});

router.post('/edit', async function (req, res) {
  try {
    const userId = req.session.userId;

    let profile = await services.profile.updateProfileByUserId(userId, req.body);

    res.send(profile)
  } catch (e) {
    res.sendStatus(500);
    console.log(e)
  }

});

module.exports = router;
