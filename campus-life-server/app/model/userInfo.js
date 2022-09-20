'use strict';

module.exports = (app) => {
    const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const UserInfo = app.model.define('userInfo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(100),
    gender: {
      type: ENUM('0', '1'),
      defaultValue: '0'
    },
    studentNo: {
      type: STRING(20),
      allowNull: false
    },
    classNo: STRING(20),

    created_at: DATE,
    updated_at: DATE,
  
  });

  return UserInfo;
};