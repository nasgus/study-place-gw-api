const express = require('express');
const router = express.Router();
const services = require('../services');
const Joi = require('joi');
const models = require('../models');


const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  login: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().required(),
  confirmationPassword: Joi.string().required()

})

router.post('/register', async (req, res) => {

  try {
    const result = Joi.validate(req.body, userSchema);

    if (result.error) {
      res.status(401).send('Validation error');
      return
    }

    const user = await services.user.findUserByEmail(result.value.email);

    if (user) {
      res.status(401).send('Email is already in use');
      return
    }

    if (result.value.password !== result.value.confirmationPassword) {
      res.status(401).send('Passwords do not match')
      return
    }

    const hash = models.User.hashPassword(result.value.password);

    delete result.value.confirmationPassword;

    result.value.password = hash;

    const newUser = await services.user.createUser(result.value);

    res.send(newUser)

  } catch (e) {
    console.log(e);
    res.status(500).send()

  }
});

router.post('/login', async (req, res) => {

  try {
    const {password, login} = req.body;

    const hash = await models.User.hashPassword(password);

    if (!(password && login)) {
      res.status(401).send('please enter email and/or password')
      return
    }

    const user = await services.user.findUserByPassAndLogin(login, hash);

    if (user) {
      req.session.userId = user.id;
      let profile = await services.profile.getProfileByUserId(user.id);
      res.setHeader('Authorized', req.session.userId)
      res.send(profile)
    } else {
      res.status(401).send('Incorrect email or password')
    }
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }

});

router.delete('/logout', async (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log(err)
    })
    res.send()
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

module.exports = router;
