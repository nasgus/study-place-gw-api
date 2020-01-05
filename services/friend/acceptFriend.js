const models = require('../../models');

module.exports = async function (friendOne, friendTwo) {
  try {
    await models.Friend.update({status: 'friends'}, {
      where: {
        friendOne,
        friendTwo
      }
    });
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
