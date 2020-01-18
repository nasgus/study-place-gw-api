const models = require('../../models');

module.exports = async function (userId) {
  try {
    let profile = await models.Profile.findOne({
      where: {
        userId
      },
      include: [
        {
          model: models.User,
          as: 'user',
          attributes: ['identity']
        }
      ]
    });

    if (profile.photo) {
      profile.photo = profile.photo.toString();
    }

    return profile
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
