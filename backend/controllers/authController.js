const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');

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
  const { email, password } = req.body; 
  console.log(email, password)
  // Input validation (as an example)
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // You can add more validation checks as needed

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
          local: {
              email: email, 
              password: hashedPassword
          }
      });
      console.log(user);

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      // Log the actual error for debugging purposes
      console.error(err);

      // Send a generic error message to the client
      res.status(400).json({ message: 'User registration failed' });
  }
};


exports.login = (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(400).json({ error: err.message });
      }
      if (!user) {
          return res.status(401).json({ error: info.message });
      }
      req.logIn(user, (err) => {
          if (err) {
              return res.status(400).json({ error: err.message });
          }
          return res.status(200).json({ message: 'Logged in successfully' });
      });
  })(req, res, next);
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); // Optional: Clear the session cookie
        res.redirect('/');
      });
};