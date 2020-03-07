const models = require('../../models');

module.exports = async function (lessonId, txt) {
  try {
    let lesson = await models.Lesson.update({
      notebook: txt
    }, {
      where: {
        uniqueLessonId: lessonId,
      }
    });

    return lesson
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
