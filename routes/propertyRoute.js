const express = require('express')
const router = express.Router()
const { uploadProperty, searchProperties} = require('../controllers/propertysController')
const { validation } = require('../middleware/auth')
const { validateSearch, validateProperty } = require("../middleware/validations");

router.post('/upload', validation, validateProperty, uploadProperty)
router.get('/search', validateSearch, searchProperties)

module.exports = router