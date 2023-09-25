const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const mongoose = require('mongoose');
const Trail = require('./models/trails');
const User = require('./models/user');
const flash = require('connect-flash');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const cors = require('cors');
const trailRoutes = require('./routes/trailRoutes');
const app = express();


//Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/trailhead');
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log('Database Connected!');
});

//Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // CORS configuration to allow requests from your frontend
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(cookieSession({
    name: 'trailhead-session',
    keys: [process.env.COOKIE_KEY]
}));
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Note: Set `secure: true` if your application is running over HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use(trailRoutes);


//Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Passport Configuration
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
app.use(requireAuth);

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
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
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
