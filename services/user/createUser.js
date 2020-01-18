const models = require('../../models');

module.exports = async function (newUser) {
  try {
    let identity = models.User.createIdentity();
    let user = await models.User.create({login: newUser.login, password: newUser.password, identity: identity});

    delete newUser.login;
    delete newUser.password;

    let profile = await models.Profile.create(newUser);

    user.setProfile(profile);
    profile.setUser(user);

    return user
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
