const models = require('../../models');

module.exports = async function (userId, values) {
  try {

    await models.Profile.update(values, {
      where: {
        userId
      }
    });

    let profile = await models.Profile.findOne({where: {userId}});

    if (profile.photo) {
      profile.photo = profile.photo.toString();
    }
    // console.log(profile.photo);

    return profile

  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
