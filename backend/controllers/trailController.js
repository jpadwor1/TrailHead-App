const trail = require('../models/trails');
const weatherApiKey = process.env.WEATHER_API_KEY;
const googleApiKey= process.env.GOOGLE_API_KEY;
const mapbox = process.env.MAPBOX;
const { shuffleArray, findClosestState, getRandomFloat } = require('../utils/helpers');

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
      res.render('./trails/search', {authenticated:authenticated,trailImages:trailImages, trails: trails,
        centerLng:centerLng,
        centerLat:centerLat,
        mapbox:mapbox
      });
    } catch (error) {
      console.log(error);
    }
};

exports.getTrailById = async (req,res) => {
  
    const trails = await trail.findById(req.params.id);
    const filteredTrails = await trail.find({}, { 'properties.reviews': 0, 'properties.photos': 0 });
    const reviews = trails.properties.reviews;
    
      let longitude, latitude;
      if (trails.geometry.type === 'LineString') {
          longitude = trails.geometry.coordinates[0][0];
          latitude = trails.geometry.coordinates[0][1];
      } else if (trails.geometry.type === 'MultiLineString') {
          longitude = trails.geometry.coordinates[0][0][0];
          latitude = trails.geometry.coordinates[0][0][1];
      }
  
      var randomTags = [];
  while (randomTags.length < 10) {
    var randomIndex = Math.floor(Math.random() * trailTags.length);
    var randomTag = trailTags[randomIndex];
    if (!randomTags.includes(randomTag)) {
      randomTags.push(randomTag);
    }
  }
  
    const nearbyTrails = filteredTrails.filter(trail => trail.properties.city === trails.properties.city).slice(1,5);
    let shuffledNearbyTrails = shuffleArray(nearbyTrails);
    res.render('./trails/show', {filteredTrails:filteredTrails,
      mapbox:mapbox,
      shuffledNearbyTrails:shuffledNearbyTrails,
      authenticated:req.isAuthenticated(),
      reviews:reviews,
      trailImages:trailImages,
      getRandomFloat: getRandomFloat, 
      nearbyTrails : nearbyTrails, 
      apiKey:weatherApiKey, 
      trails : trails, 
      longitude : longitude, 
      latitude : latitude, 
      randomTags:randomTags,
      googleApiKey:googleApiKey
    });
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