const Transport = require('../models/Transport');

// Get transports with pagination
exports.getTransports = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const totalItems = await Transport.countDocuments();
    const transports = await Transport.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ data: transports, totalItems });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transports', error });
  }
};

// Add a new transport
exports.addTransport = async (req, res) => {
  const { routeName, vehicleNumber, driverName, licenseNumber, phoneNumber } = req.body;

  const newTransport = new Transport({
    routeName,
    vehicleNumber,
    driverName,
    licenseNumber,
    phoneNumber,
  });

  try {
    await newTransport.save();
    res.status(201).json({ message: 'Transport added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding transport', error });
  }
};
