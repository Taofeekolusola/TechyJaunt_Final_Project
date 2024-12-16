const express = require('express')
const router = express.Router()
const { uploadProperty, searchProperties, getPropertyDetails} = require('../controllers/propertysController')
const { validation } = require('../middleware/auth')

router.post('/upload', validation, uploadProperty)
router.get('/search', validation, searchProperties)
router.get('/details/:propertyId', validation, getPropertyDetails)

module.exports = router