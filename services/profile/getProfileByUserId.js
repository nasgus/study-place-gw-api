const models = require('../../models');

module.exports = async function (userId, attributes) {
  try {
    let profile = await models.Profile.findOne({
      where: {
        userId
      },
      include: [
        {
          model: models.User,
          as: 'user',
        }
      ],
      attributes: attributes
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
