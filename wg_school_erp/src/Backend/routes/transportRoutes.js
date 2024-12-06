const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

// GET all transports with pagination
router.get('/', transportController.getTransports);

// POST a new transport
router.post('/', transportController.addTransport);

module.exports = router;
