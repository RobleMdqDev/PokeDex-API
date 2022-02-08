'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
      const hash = bcrypt.hashSync('1111', 10);
     await queryInterface.bulkInsert('users', [{      
        username: `admin`,        
        password: hash,
        team: '25',
        avatar: '0',
        createdAt: new Date(),
        updatedAt: new Date(),      
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
