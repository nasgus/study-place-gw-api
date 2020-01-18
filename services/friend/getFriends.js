const models = require('../../models');
const Op = require('sequelize').Op;

module.exports = async function (userId) {
  try {
    let friends = await models.Friend.findAll({
      where: {
        [Op.or]: {
          friendOne: userId,
          friendTwo: userId
        },
        status: 'friends'

      }
    });
    let subscribers = await models.Friend.findAll({
      where: {
        [Op.or]: {
          friendOne: userId,
          friendTwo: userId
        },
        status: userId
      }
    });

    let subscribersIds = subscribers.map(friends => friends.friendOne);
    let friendsIds = friends.map(friend => friend.friendOne);

    let subscribersProfiles = await models.Profile.findAll({
      where: {
        userId: subscribersIds
      },
      attributes: ['firstName', 'lastName', 'education', 'userId']
    });

    let friendsProfiles = await models.Profile.findAll({
      where: {
        userId: friendsIds
      },
      attributes: ['firstName', 'lastName', 'education', 'userId']
    })

    // console.log(friends, subscribersProfiles);

    return {
      friends: friendsProfiles,
      subscribers: subscribersProfiles
    }
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
