const express = require('express');
const router = express.Router();
const services = require('../services');

router.get('/', async function (req, res) {
  try {
    const userId = req.session.userId;

    if (userId) {
      let profile = await services.profile.getProfileById(userId);

      res.send(profile)
    } else {
      res.sendStatus(401)
    }

  }catch (e) {
    console.log(e);
    res.sendStatus(500)
  }
});

router.post('/registration', async function (req, res) {

});

module.exports = router;
