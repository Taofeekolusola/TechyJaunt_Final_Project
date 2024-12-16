const express = require('express');
const usersRoutes = require('../routes/usersRoute');
const propertyRoutes = require('../routes/propertyRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(propertyRoutes); // Register routes

// Use the auth routes
app.use('/auth', usersRoutes);
app.use('/api', propertyRoutes);

module.exports = app;