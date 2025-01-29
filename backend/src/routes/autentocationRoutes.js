const express = require('express');
const router = express.Router();
const autenticationController = require('../controllers/autenticationController');

router.post('/register', autenticationController.registerUser);
router.post('/login', autenticationController.login);

module.exports = router;