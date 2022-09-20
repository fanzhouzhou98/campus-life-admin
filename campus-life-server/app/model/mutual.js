'use strict';

module.exports = (app) => {
  const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const Mutual = app.model.define('mutual', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    info: STRING(225),
    studentNo: {
      type: STRING(20),
      allowNull: false
    },
    phone: STRING(20),

    createdTime: DATE,
    updatedTime: DATE,
    userID: STRING(225)
  });
  Mutual.sync({ alter: true })
  return Mutual;
};