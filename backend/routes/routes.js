const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Include your User model here
const mongoose = require('mongoose');
const authController = require('../controllers/authController');


// Local Authentication
router.post('/signup', authController.signup);


router.post('/login', passport.authenticate('local'), authController.login);

router.get('/logout', authController.logout);

  
module.exports = router;
