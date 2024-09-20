const { DataTypes } = require('sequelize')

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('cards', 
			{
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING(255),
					allowNull: false,
					unique: true
				},
				description: {
					type: DataTypes.STRING(1000),
					allowNull: true,
				},
				cost: {
					type: DataTypes.INTEGER,
					allowNull: false
				},
				attack: {
					type: DataTypes.INTEGER,
					allowNull: false
				},
				defense: {
					type: DataTypes.INTEGER,
					allowNull: false
				},
				'bg_color': {
					type: DataTypes.STRING(7),
					allowNull: false
				},
				'bg_text_color': {
					type: DataTypes.STRING(7),
					allowNull: false
				},
				img: {
					type: DataTypes.TEXT,
					allowNull: false
				}
			}
		)
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('cards')
	}
}
