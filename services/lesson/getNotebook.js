const models = require('../../models');

module.exports = async function (lessonId) {
  try {
    let lesson = await models.Lesson.findOne({
      where: {
        uniqueLessonId: lessonId,
      }
    });

    return {name: lesson.title, html: lesson.notebook}
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
