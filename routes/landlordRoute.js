const express = require('express');
const route = express.Router();
const { getLandlordDetails } = require('../controllers/landlordController');


route.get('/details/:id', getLandlordDetails);

module.exports = route;