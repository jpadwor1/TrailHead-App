const bcrypt = require('bcryptjs');
const User = require('../models/user');
const bodyParser = require('body-parser');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const trail = require('../models/trails');

var userProfile;
let authenticated;
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, allow access to the authenticated route
    authenticated=true;
    return next();
  } else {
    // User is not authenticated, redirect to the non-authenticated route
    authenticated=false;
    return next();
  }
};

exports.register = async (req, res) => {
  const { email, username, password } = req.body; 

  try {
      // Input validation should be performed here
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
          local: {
              username: username,
              email: email, 
              password: hashedPassword
          }
      });

      await user.save();

      // After successful registration, respond with a success message
      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      // Handle errors and provide meaningful error responses
      res.status(400).json({ error: 'User registration failed', message: err.message });
  }
};


exports.login = (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    userProfile = req.user;
    res.redirect('/success');
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); // Optional: Clear the session cookie
        res.redirect('/');
      });
};