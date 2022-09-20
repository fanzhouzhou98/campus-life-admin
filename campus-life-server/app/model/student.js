'use strict';

module.exports = (app) => {
    const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const Student = app.model.define('student', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    grade: STRING(100),
    gender: {
      type: ENUM('0', '1'),
      defaultValue: '0'
    },
    studentNo: {
      type: STRING(20),
      allowNull: false
    },
    classNo: STRING(110),
  });
  Student.sync({ alter: true })
  return Student;
};