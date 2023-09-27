const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const trailRoutes = require('./routes/trailRoutes');
const authRoutes = require('./routes/authRoutes');

// Importing the modularized configurations
const passport = require('./passportConfig');
const connectDB = require('./database');

// Connect to the database
connectDB();

//Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // CORS configuration to allow requests from your frontend
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Note: Set `secure: true` if your application is running over HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());


//Routes
app.use(trailRoutes);
app.use(authRoutes);


//Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
