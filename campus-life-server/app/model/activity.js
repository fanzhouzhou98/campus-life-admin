'use strict';

module.exports = (app) => {
  const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const Activity = app.model.define('actitvity', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    activityName: STRING(30),
    clubName: STRING(100),
    score: INTEGER(10),
    count: INTEGER(10),
    principal: STRING(30),
    principalName: STRING(20),
    createdTime: DATE,
    endTime: DATE,

  });
  Activity.sync({ alter: true })
  return Activity;
};