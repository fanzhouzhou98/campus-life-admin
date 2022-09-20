'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      password:STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};
