const mongoose = require('mongoose');

// Define the schema for a hostel room
const hostelRoomSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  roomNumber: { type: String, required: true, unique: true },
  name: { type: String, required:true},
  roomType: { type: String, required: true },
 
  numberOfBeds: { type: Number, required: true },
  costPerBed: { type: Number, required: true },
});

const HostelRoom = mongoose.model('HostelRoom', hostelRoomSchema);

module.exports = HostelRoom;
