const models = require('../../models');

module.exports = async function (friendOne, friendTwo) {
  try {
    await models.Friend.create({friendOne, friendTwo, status: friendTwo});
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
