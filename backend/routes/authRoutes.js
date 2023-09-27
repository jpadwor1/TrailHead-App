const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Include your User model here
const mongoose = require('mongoose');
const authController = require('../controllers/authController');
const passport = require('passport');


// Local Authentication
router.post('/api/register', (req, res, next) => {
    console.log("GET /api/register route hit");
    authController.register(req, res, next);
  });

router.post('/api/login', (req, res, next) => {
    console.log("Request body:", req.body);
    next();
}, passport.authenticate('local'), authController.login);

router.get('/api/logout', authController.logout);

  
module.exports = router;
