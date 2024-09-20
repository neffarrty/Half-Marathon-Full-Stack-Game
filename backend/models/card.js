const { DataTypes } = require('sequelize')
const sequelize = require('../utils/db')

const Card = sequelize.define(
    'card',
    {
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
    },
    {
        timestamps: false
    }
)

module.exports = Card
