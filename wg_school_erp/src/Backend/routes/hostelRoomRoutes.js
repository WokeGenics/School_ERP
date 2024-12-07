const express = require('express');
const {
  getAllHostelRooms,
  addHostelRoom,
  updateHostelRoom,
  deleteHostelRoom,
} = require('../controllers/hostelRoomController');

const router = express.Router();

// Define routes and link them to controller methods
router.get('/', getAllHostelRooms);
router.post('/', addHostelRoom);
router.put('/:roomNumber', updateHostelRoom);
router.delete('/:roomNumber', deleteHostelRoom);

module.exports = router;
