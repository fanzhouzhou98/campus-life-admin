'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('userInfo', {
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
  },
  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('userInfo');

  }
};
