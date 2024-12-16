const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/paymentController');
const { validation } = require('../middleware/auth');

router.post('/', validation, makePayment);

module.exports = router;