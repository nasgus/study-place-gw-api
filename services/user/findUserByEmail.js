const models = require('../../models');

module.exports = async function (email) {
  try {
    let user = await models.User.findOne({
      where: {
        email: email
      }
    });

    return user
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
