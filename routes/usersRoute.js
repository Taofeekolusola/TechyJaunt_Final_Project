const express = require('express')
const router = express.Router()
const { signup, login, updateUser, deleteUser, getAllUsers, getUserById } = require('../controllers/usersController')
const { validation } = require('../middleware/auth')

router.post('/upload', login)
router.post('/signup', signup)
router.put('/update/:id', validation, updateUser)
router.delete('/delete/:id', validation, deleteUser)
router.get('/all', getAllUsers)
router.get('/user/:id', validation, getUserById)

module.exports = router