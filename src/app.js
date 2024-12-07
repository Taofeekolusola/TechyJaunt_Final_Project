const express = require('express');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const propertyRoutes = require('../routes/propertyRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(propertyRoutes); // Register routes

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', propertyRoutes);

module.exports = app;
