const Admission = require('../models/Admission'); // Adjust path to the model

// Create a new admission
exports.createAdmission = async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    const savedAdmission = await newAdmission.save();
    res.status(201).json({ message: 'Admission created successfully', data: savedAdmission });
  } catch (error) {
    res.status(400).json({ message: 'Error creating admission', error });
  }
};

// Get all admissions with optional filters
exports.getAdmissions = async (req, res) => {
  try {
    const { admissionNumber, name, class: studentClass } = req.query;

    // Build filter object
    const filters = {};
    if (admissionNumber) filters.admissionNumber = admissionNumber;
    if (name) {
      filters.$or = [
        { firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } },
      ];
    }
    if (studentClass) filters.class = studentClass;

    const admissions = await Admission.find(filters);
    res.status(200).json({ message: 'Admissions fetched successfully', data: admissions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admissions', error });
  }
};

// Get a single admission by ID
exports.getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.admissionNumber);
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json({ message: 'Admission fetched successfully', data: admission });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission', error });
  }
};

// Update an admission by ID
exports.updateAdmission = async (req, res) => {
  try {
    const updatedAdmission = await Admission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json({ message: 'Admission updated successfully', data: updatedAdmission });
  } catch (error) {
    res.status(400).json({ message: 'Error updating admission', error });
  }
};

// Delete an admission by ID
exports.deleteAdmission = async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json({ message: 'Admission deleted successfully', data: deletedAdmission });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admission', error });
  }
};

exports.getAllAdmissions = async (req, res) => {
    try {
      const { admissionNumber, name, class: studentClass } = req.query;
  
      // Build the filter object based on query parameters
      const filters = {};
      if (admissionNumber) filters.admissionNumber = admissionNumber;
      if (name) {
        filters.$or = [
          { firstName: { $regex: name, $options: 'i' } },
          { lastName: { $regex: name, $options: 'i' } },
        ];
      }
      if (studentClass) filters.class = studentClass;
  
      // Fetch admissions with filters
      const admissions = await Admission.find(filters);
      res.status(200).json({ message: 'Admissions retrieved successfully', data: admissions });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching admissions', error });
    }
  };
  