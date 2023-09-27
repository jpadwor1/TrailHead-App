const trail = require('../models/trails');
const weatherApiKey = process.env.WEATHER_API_KEY;
const googleApiKey= process.env.GOOGLE_API_KEY;
const mapbox = process.env.MAPBOX;
const mongoose = require('mongoose');
const { findClosestState, getRandomFloat } = require('../utils/helpers');
// Example shuffleArray function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
exports.findNearbyTrails = async (req, res) => {

    const { latitude, longitude } = req.body;
    
    const trails = await trail.find();
  // Find the closest state based on the user's location
   closestState = findClosestState(latitude, longitude);
  
  // Filter the trails array to get the matching trails based on the state
  const foundTrails = await trail.find({ $text: { $search: closestState } });
  const matchingTrails = trails.filter(trail => trail.properties.state === closestState);
    res.json({ foundTrails });
};

exports.getHome = async (req,res) => { 
    const trails = await trail.find();
    const foundTrails = await trail.find({ $text: { $search: closestState || "California"  } });
    res.render('home', {foundTrails:foundTrails, authenticated:req.isAuthenticated(),trails: trails, trailImages:trailImages,getRandomFloat: getRandomFloat});}
    
exports.getTrails = async (req, res) => {
    let totalLat = 0;
    let totalLng = 0;
    let count = 0;
    
    try {
      const trails = await trail.find();
      trails.forEach((trail) => {
        if (trail.geometry.type === 'LineString') {
          trail.geometry.coordinates.forEach((coordinate) => {
            totalLng += coordinate[0];
            totalLat += coordinate[1];
            count++;
          });
        } else if (trail.geometry.type === 'MultiLineString') {
          trail.geometry.coordinates.forEach((subCoordinates) => {
            subCoordinates.forEach((coordinate) => {
              totalLng += coordinate[0];
              totalLat += coordinate[1];
              count++;
            });
          });
        } else if (trail.geometry.type === 'Point') {
          totalLng += trail.geometry.coordinates[0];
          totalLat += trail.geometry.coordinates[1];
          count++;
        }
      });
      
      // calculate average latitude and longitude
      let centerLat = totalLat / count;
      let centerLng = totalLng / count;
      res.json({
        trails,
        centerLat,
        centerLng
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch trails' });
    }
  };

  exports.getTrailById = async (req, res) => {
    console.log("Request received for trail ID:", req.params.id);
    try {
        // Get the trail by its ID
        const trailById = await trail.findById(req.params.id);
        if (!trailById) {
            return res.status(404).json({ message: "Trail not found" });
        }

        // Get all trails excluding the one with the provided ID and without certain fields
        const allTrails = await trail.find({ 
          _id: { $ne: new mongoose.Types.ObjectId(req.params.id) }, // Exclude the trail with the provided ID
        });

        // Filter trails to get the nearby ones based on the city of the queried trail
        const nearbyTrails = allTrails.filter(t => t.properties.city === trailById.properties.city).slice(0, 4);

        // Shuffle the nearby trails array (assuming you have a shuffleArray function)
        const shuffledNearbyTrails = shuffleArray(nearbyTrails);

        // Return the trail and the nearby trails
        res.json({
            trail: trailById,
            nearbyTrails: shuffledNearbyTrails
        });

    } catch (error) {
        console.error("Error fetching the trail by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};



exports.searchTrails = async (req,res) => {
  
    const query = req.body.searchBar;
    const searchItem = query.toLowerCase();
    const foundTrails = await trail.find({ $text: { $search: searchItem } });
    const filteredTrails = await trail.find({}, { 'properties.reviews': 0, 'properties.photos': 0 });
   
    res.render('./trails/search', {authenticated:req.isAuthenticated(),trailImages:trailImages,
     trails: foundTrails, filteredTrails:filteredTrails});
  };

exports.createReview = async (req, res) => {
  try {
    const currentTrail = await trail.findById(req.params.id);
    if (!currentTrail) {
      // Handle the case where the trail is not found
      return res.status(404).send('Trail not found');
    }

    const { displayName, photos } = req.user;

    const newReview = {
      author_name: req.body.authorName,
      author_url: '',
      profile_photo_url: '',
      rating: req.body.rating,
      relative_time_description: '', // You can customize this field as needed
      text: req.body.reviewText,
      time: Math.floor(Date.now() / 1000), // Timestamp in seconds
    };

    currentTrail.properties.reviews.push(newReview);
    await currentTrail.save();

    res.sendStatus(200); // Send a success status code
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Send an error status code
  }
};