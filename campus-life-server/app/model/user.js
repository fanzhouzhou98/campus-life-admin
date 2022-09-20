'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE,MENU } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    userID:STRING(100),
    userType:{type:INTEGER,defaultValue:1},
    password:STRING,
    created_at: DATE,
    updated_at: DATE,
  });
  User.sync({ alter: true })
  return User;
};