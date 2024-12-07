const HostelRoom = require('../models/HostelRoom');

// Get all hostel rooms
const getAllHostelRooms = async (req, res) => {
  try {
    const rooms = await HostelRoom.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new hostel room
const addHostelRoom = async (req, res) => {
  const { hostelName, roomNumber,name, roomType, numberOfBeds, costPerBed } = req.body;

  const newRoom = new HostelRoom({
    hostelName,
    roomNumber,
    name,
    roomType,
    numberOfBeds,
    costPerBed,
  });

  try {
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a hostel room
const updateHostelRoom = async (req, res) => {
  const { roomNumber } = req.params;
  const { hostelName, roomType, name, numberOfBeds, costPerBed } = req.body;

  try {
    const updatedRoom = await HostelRoom.findOneAndUpdate(
      { roomNumber },
      { hostelName, roomType, name, numberOfBeds, costPerBed },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a hostel room
const deleteHostelRoom = async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const deletedRoom = await HostelRoom.findOneAndDelete({ roomNumber });
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllHostelRooms,
  addHostelRoom,
  updateHostelRoom,
  deleteHostelRoom,
};
