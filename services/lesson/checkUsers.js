const models = require('../../models');
const Op  = require('sequelize').Op

module.exports = async function (uniqueLessonId, userId) {
  try {
    let lesson = models.Lesson.findOne({
      where: {
        uniqueLessonId,
        [Op.or]: [
          {outgoingUser: userId},
          {incomingUser: userId}
        ]
      }
    });

    return lesson
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
