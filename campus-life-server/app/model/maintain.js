'use strict';

module.exports = (app) => {
  const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const Maintain = app.model.define('maintain', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    reason: STRING(30),
    pusher: STRING(100),
    repairer: STRING(10),
    phone: STRING(20),
    status: STRING(20),
    userID: STRING(255),
    createdTime: DATE,
  });
  Maintain.sync({ alter: true })
  return Maintain;
};