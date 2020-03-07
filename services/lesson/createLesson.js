const models = require('../../models');

module.exports = async function (outgoingUserId, incomingUserId, title) {
  try {
    let outgoingUser = await models.User.findByPk(outgoingUserId);
    let incomingUser = await models.User.findByPk(incomingUserId);

    let uniqueLessonId = await models.Lesson.createUniqueLessonId()

    let lesson = await models.Lesson.build({
      outgoingUser: outgoingUser.id,
      incomingUser: incomingUser.id,
      uniqueLessonId: uniqueLessonId,
      title: title
    });

    await lesson.save();

    return lesson
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
