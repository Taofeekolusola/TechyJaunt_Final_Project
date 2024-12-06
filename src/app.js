const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const testRouter = require('../routes/testRoute')

const app = express();

dotenv.config();

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization' // Allow these headers
  };

  //ROUTES
app.use(cors(corsOptions));
app.use(express.json());
app.use('/test', testRouter);

module.exports = app;