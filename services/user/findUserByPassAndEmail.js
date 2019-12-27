const models = require('../../models');

module.exports = async function (email, hash) {
  try {
    let user = await models.User.findOne({
      where: {
        email: email,
        password: hash
      },
      attributes: ['id', 'email', 'firstName', 'lastName', 'middleName']
    });

    return user
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
