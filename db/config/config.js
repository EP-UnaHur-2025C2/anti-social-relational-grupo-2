require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database_development',
    storage: process.env.DB_STORAGE || 'data/data.db',
    dialect: process.env.DB_DIALECT || 'sqlite'
  }
}