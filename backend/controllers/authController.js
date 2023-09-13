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
exports.signup = async (req, res) => {   
        const inputEmail = req.body.signupEmail;
        console.log(inputEmail);
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                local: {
                    email: inputEmail,
                    password: hashedPassword
                }
            });
            await user.save();
            res.redirect('./home');
        } catch (err){
            console.log(err);
            res.render('./trails/register', { messages: req.flash() });
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