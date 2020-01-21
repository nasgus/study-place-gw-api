const models = require('../../models');

module.exports = async function (uniqueLessonId, userId) {
  try {
    let lesson = models.Lesson.findOne({
      where: {
        uniqueLessonId
      }
    });

    console.log(lesson);

    return lesson
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
