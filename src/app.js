const express = require('express');
const usersRoutes = require('../routes/usersRoute');
const propertyRoutes = require('../routes/propertyRoute');
const paymentRoutes = require('../routes/paymentRoute');
const cors = require('cors')


const app = express();

// Middleware
app.use(express.json());
// Middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };

  app.use(cors(corsOptions));

// Use the auth routes
app.use('/user', usersRoutes);
app.use('/property', propertyRoutes);
app.use('/payment', paymentRoutes);

module.exports = app;