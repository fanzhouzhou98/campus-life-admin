'use strict';

module.exports = (app) => {
    const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const Grade = app.model.define('grade', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grade: STRING(30),
    major: STRING(100),
    classNo: STRING(20),
    classfalName:STRING(20),
    count:STRING(10),
    teacher:STRING(50)
  });
  Grade.sync({ alter: true })
  return Grade;
};