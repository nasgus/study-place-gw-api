const express = require('express');
const router = express.Router();
const services = require('../services');

router.get('/auth', async function (req, res) {
  try {
    if (req.session.userId) {
      res.sendStatus(200)
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
