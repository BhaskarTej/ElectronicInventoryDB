const express = require('express');
const router = express.Router();
const { getSalesForecast } = require('../controllers/forecastController');

router.get('/forecast/:productId', getSalesForecast);

module.exports = router;