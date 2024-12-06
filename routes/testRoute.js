const express = require('express')
const router = express.Router()
const {testApiHandler} = require('../controllers/testController')

router.get('/', testApiHandler)
module.exports = router