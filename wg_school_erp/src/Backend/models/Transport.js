const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  driverName: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
