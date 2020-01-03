const models = require('../../models');

module.exports = async function (userId, values) {
  try {

    console.log(userId, values)

    let updatedProfile = await models.Profile.update(values, {
      where: {
        userId
      },
      returning: true
    });

    console.log(updatedProfile);

    let profile = updatedProfile[0];

    profile.photo = profile.photo.toString();

    return profile

  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
