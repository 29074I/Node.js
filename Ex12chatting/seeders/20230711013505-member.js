'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //값을 넣을 때
   
     await queryInterface.bulkInsert('member', [{
       id : 'test',
       pw : '1234',
       nick : 'testnick'
     },{
      id : 'test1',
      pw : '123',
      nick : 'test1nick'
     }], {});
    
  },

  async down (queryInterface, Sequelize) { //전체 초기화
    
     await queryInterface.bulkDelete('member', null, {});
     
  }
};
