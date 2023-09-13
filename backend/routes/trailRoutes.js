const express = require('express');
const router = express.Router();
const trailController = require('../controllers/trailController');

require('dotenv').config();

router.use(express.json());

router.post('/nearby', trailController.findNearbyTrails);

router.get('/', trailController.getHome); 

router.get('/trails', trailController.getTrails);
  
router.get('/trails/:id', trailController.getTrailById);

router.post('/trails/search', trailController.searchTrails);

router.post('/trails/:id/reviews', trailController.createReview);

module.exports = router;
