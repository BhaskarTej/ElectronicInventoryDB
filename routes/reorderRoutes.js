const express = require('express');
const router = express.Router();
const { checkAndReorderProducts } = require('../controllers/reorderController');

router.post('/reorder', checkAndReorderProducts);

module.exports = router;