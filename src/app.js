const express = require('express');
const usersRoutes = require('../routes/usersRoute');
const propertyRoutes = require('../routes/propertyRoute');
const paymentRoutes = require('../routes/paymentRoute');
const landlordRoutes = require('../routes/landlordRoute');
const cors = require('cors')


const app = express();

// Middleware
app.use(express.json());
// Middleware
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization' // Allow these headers
  };

  app.use(cors(corsOptions));

// Use the auth routes
app.use('/auth', usersRoutes);
app.use('/api', propertyRoutes);
app.use('/payment', paymentRoutes);
app.use('/landlord', landlordRoutes);

module.exports = app;