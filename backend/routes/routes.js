const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Include your User model here
const mongoose = require('mongoose');
const authController = require('../controllers/authController');


// Local Authentication
router.post('/api/register', authController.register);


router.post('/api/login', passport.authenticate('local'), authController.login);

router.get('/api/logout', authController.logout);

  
module.exports = router;
