const express = require('express');
const router = express.Router();
const trailController = require('../controllers/trailController');

require('dotenv').config();

router.use(express.json());

router.post('/api/nearby', trailController.findNearbyTrails);

router.get('/', trailController.getHome); 

router.get('/api/trails', (req, res, next) => {
    console.log("GET /api/trails route hit");
    trailController.getTrails(req, res, next);
  });
  
router.get('/api/trails/:id', trailController.getTrailById);

router.post('/api/trails/search', trailController.searchTrails);

router.post('/api/trails/:id/reviews', trailController.createReview);

module.exports = router;
