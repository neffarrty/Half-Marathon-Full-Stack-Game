const { DataTypes } = require('sequelize')

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('users', 
			{
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING(255),
					allowNull: false,
					unique: true
				},
				username: {
					type: DataTypes.STRING(255),
					allowNull: false,
					unique: true
				},
				avatar: {
					type: DataTypes.TEXT,
					defaultValue: '/images/avatars/default-avatar.png'
				},
				password: {
					type: DataTypes.TEXT,
					allowNull: false
				},
				createdAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
				updatedAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				}
			}
		)
	},
	async down (queryInterface, Sequelize) {
	 	await queryInterface.dropTable('users')
	}
}
