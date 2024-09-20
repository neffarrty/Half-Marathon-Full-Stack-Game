const cardsData = require('../utils/cards.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cards', cardsData, {})

  },
  async down (queryInterface, Sequelize) {
    	await queryInterface.bulkDelete('cards', null, {})
  }
}
