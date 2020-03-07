const getProfileByUserId = require('../services/profile/getProfileByUserId')

module.exports = async function (lessons, userId) {
  let profiles = {};
  return await Promise.all(lessons.map(async (lesson) => {
    if (profiles[lesson.outgoingUser]) {
      lesson.outgoingUser = profiles[lesson.outgoingUser]
    } else if (profiles[lesson.incomingUser]) {
      lesson.incomingUser = profiles[lesson.incomingUser]
    } else {
      let outgoingUser = await getProfileByUserId(lesson.outgoingUser, ['firstName', 'lastName', 'id', 'userId']);
      let incomingUser = await getProfileByUserId(lesson.incomingUser, ['firstName', 'lastName', 'id', 'userId']);

      profiles[outgoingUser.id] = outgoingUser;
      profiles[incomingUser.id] = incomingUser;

      lesson.outgoingUser = profiles[lesson.outgoingUser];
      lesson.incomingUser = profiles[lesson.incomingUser];
    }

    if (+userId === +lesson.outgoingUser.userId) {
      lesson.me = lesson.outgoingUser;
      lesson.you = lesson.incomingUser
    } else {
      lesson.me = lesson.incomingUser;
      lesson.you = lesson.outgoingUser
    }

    delete lesson.incomingUser;
    delete lesson.outgoingUser;
    delete lesson.notebook;
    delete lesson.updatedAt;

    return await lesson
  }));
};