const models = require('../../models');

module.exports = async function (email) {
  try {
    let profile = await models.Profile.findOne({
      where: {
        email: email
      }
    });

    return profile
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
