const bcrypt = require('bcryptjs');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
      const user = await User.findOne({ 'local.email': email });
      if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
  } catch (err) {
      return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/*  Google AUTH  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
module.exports = passport;