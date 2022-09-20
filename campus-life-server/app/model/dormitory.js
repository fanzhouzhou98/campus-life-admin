'use strict';

module.exports = (app) => {
    const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;

  const Dormitory = app.model.define('dormitory', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    campus: STRING(30),
    towerNo: STRING(100),
    dormitory:STRING(30),
    count: INTEGER(10),
    dormitorAdimner:STRING(20),
    created_at: DATE,
    updated_at: DATE,
  
  });
  Dormitory.sync({ alter: true })
  return Dormitory;
};