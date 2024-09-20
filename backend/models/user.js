const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define(
    'user',
    {
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
        }
    }
)

module.exports = User
