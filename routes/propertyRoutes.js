const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { validateProperty } = require('../middleware/validation');
const upload = require('../middleware/upload');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

// Define property routes
router.post('/api/property', verifyToken, validateProperty, propertyController.createProperty);
router.get('/api/property', verifyToken, propertyController.getAllProperties);
router.get('/api/property/:id', verifyToken, propertyController.getPropertyById);
router.put('/api/property/:id', verifyToken, propertyController.updateProperty);
router.delete('/api/property/:id', verifyToken, propertyController.deleteProperty);

// Define the photo upload route for a specific property by ID
router.post('/api/property/:id/photo', 
  verifyToken, 
  upload.single('photo'), 
  propertyController.uploadPhoto
);

module.exports = router;
