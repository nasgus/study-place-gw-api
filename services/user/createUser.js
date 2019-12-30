const models = require('../../models');

module.exports = async function (newUser) {


  try {
    let user = await models.User.create({login: newUser.login, password: newUser.password});

    delete newUser.login;
    delete newUser.password;

    let profile = await models.Profile.create(newUser);

    user.set(profile);

    return profile
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
