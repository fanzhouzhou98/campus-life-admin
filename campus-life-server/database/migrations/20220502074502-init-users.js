'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    Sequelize.sync({ force: true }) 
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER(10),
      password:STRING(50),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
