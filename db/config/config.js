require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_User,
        password: process.env.DB_Password,
        database: process.env.DB_Name,
        storage: process.env.DB_Storage,
        dialect: process.env.DB_Dialect
    }
}