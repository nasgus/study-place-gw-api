const models = require('../../models');

module.exports = async function (friendOne, friendTwoIdentity) {
  try {
    const friendTwo = await models.User.findOne({
      where: {
        identity: friendTwoIdentity
      }
    })


    if (friendTwo) {
      let friends = await models.Friend.findOrCreate({
        where: {
          friendOne, friendTwo: friendTwo.id
        },
        defaults: {
          status: friendTwo.id
        }
      });

      if (friends[1]) {
        return friends[1]
      }
    } else {
      return 404
    }

  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
