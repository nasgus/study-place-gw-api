const models = require('../../models');

module.exports = async function (newUser) {
  try {
    let user = await models.User.create(newUser);

    return user
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
