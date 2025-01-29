const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewareAutenticacion = require('../middleware/middlewareAutentication');


router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.get('/profile', middlewareAutenticacion, userController.getUserProfile);
router.put('/profile', middlewareAutenticacion, userController.updateUserProfile);

module.exports = router;