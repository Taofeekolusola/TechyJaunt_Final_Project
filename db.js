const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use the environment variables for database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Make sure the port is correct
    dialect: 'postgres',
    logging: false, // Optionally, turn off logging for production
});

(async () => {
    try {
        // Test the connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;