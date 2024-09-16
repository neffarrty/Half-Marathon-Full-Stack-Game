require('dotenv').config()

const PORT = process.env.PORT || 3000

const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_DIALECT =  process.env.DB_DIALECT


module.exports = {
    PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT
}