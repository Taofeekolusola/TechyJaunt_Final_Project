const express = require('express')
const router = express.Router()
const { signup, login, updateUser, deleteUser, getAllUsers, getUserById, getUserDetails, assignRole } = require('../controllers/usersController')
const { validation } = require('../middleware/auth')

router.post('/login', login)
router.post('/signup', signup)
router.put('/update/:id', validation, updateUser)
router.delete('/delete/:id', validation, deleteUser)
router.get('/all', validation, getAllUsers)
router.get('/:id', validation, getUserById)
router.get('/details/:userId', validation, getUserDetails)
router.put('/role/:id', validation, assignRole)

module.exports = router