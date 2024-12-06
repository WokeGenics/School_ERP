const ClassRoutine = require('../models/classRoutine');

// Get all routines
exports.getAllClassRoutines = async (req, res) => {
  try {
    const routines = await ClassRoutine.find();
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class routines', error });
  }
};

// Create a new routine
exports.createClassRoutine = async (req, res) => {
  try {
    const { day, class: className, subject, section, teacher, time, date } = req.body;

    // Validate required fields
    if (!day || !className || !subject || !section || !teacher || !time || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save new class routine
    const newRoutine = new ClassRoutine({
      day, 
      class: className, 
      subject, 
      section, 
      teacher, 
      time, 
      date
    });

    await newRoutine.save();

    return res.status(201).json({ routine: newRoutine });
  } catch (error) {
    console.error('Error creating class routine:', error);
    return res.status(500).json({ message: 'Error creating class routine', error });
  }
};

// Update an existing routine
exports.updateClassRoutine = async (req, res) => {
  try {
    const { day, class: className, subject, section, teacher, time, date } = req.body;

    // Validate required fields
    if (!day || !className || !subject || !section || !teacher || !time || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save new class routine
    const newRoutine = new ClassRoutine({ day, class: className, subject, section, teacher, time, date });
    await newRoutine.save();

    return res.status(201).json({ routine: newRoutine });
  } catch (error) {
    console.error('Error creating class routine:', error);
    return res.status(500).json({ message: 'Error creating class routine', error });
  }
};

// Delete a routine
exports.deleteClassRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoutine = await ClassRoutine.findByIdAndDelete(id);
    if (!deletedRoutine) {
      return res.status(404).json({ message: 'Class routine not found' });
    }
    res.status(200).json({ message: 'Class routine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class routine', error });
  }
};
