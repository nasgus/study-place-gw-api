const models = require('../../models');
const Op  = require('sequelize').Op;
const lessonDecorator = require('../../decorators/lessonDecorator')

module.exports = async function (userId, attributes) {
  try {
    let lessons = await models.Lesson.findAll({
      where: {
        [Op.or]: [
          {outgoingUser: userId},
          {incomingUser: userId}
        ]
      },
      raw: true,
      attributes: attributes
    });

    return lessons
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
};
