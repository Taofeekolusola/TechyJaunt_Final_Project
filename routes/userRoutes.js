const express = require('express');
const { deleteUser, updateUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// Delete user by ID
router.delete('/users/:id', deleteUser);

// Update user information by ID
router.put('/users/:id', updateUser);

// Route to get all users
router.get('/users', getAllUsers);


module.exports = router;
