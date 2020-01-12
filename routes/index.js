const express = require('express');
const router = express.Router();
const services = require('../services');

router.get('/auth', async function (req, res) {
  try {
    if (req.session.userId) {
      console.log(req.session.userId)
      let profile = await services.profile.getProfileByUserId(req.session.userId);
      res.send(profile)
    } else {
      res.sendStatus(401)
    }

  } catch (e) {
    res.sendStatus(500)
  }
});

router.post('/', async function (req, res) {

});

module.exports = router;
