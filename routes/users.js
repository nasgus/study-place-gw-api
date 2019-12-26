const express = require('express');
const router = express.Router();
const services = require('../services');
const Joi = require('joi');
const models = require('../models');


const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
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
  const {password, email} = req.body;

  const hash = await models.User.hashPassword(password);

  if (!(password && email)) {
    res.status(401).send('please enter email and/or password')
    return
  }

  const user = await services.user.findUserByPassAndEmail(email, hash);

  if (user) {
    req.session.loggedin = true;
    req.session.email = email;

    res.send(user)
  } else {
    res.status(401).send('Incorrect email or password')
    return
  }

});

module.exports = router;
