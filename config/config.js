require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Require SSL/TLS
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    },
  },
  jwtSecret: process.env.JWT_SECRET_KEY,
};

module.exports = config;
