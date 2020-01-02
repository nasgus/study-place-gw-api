const models = require('../../models');

module.exports = async function (login, hash) {
  try {
    let user = await models.User.findOne({
      where: {
        login: login,
        password: hash
      },
      attributes: ['id']
    });

    return user
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
