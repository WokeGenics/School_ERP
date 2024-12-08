const ClassSchedule = require('../models/classSchedule');



exports.addSchedule = async (req, res) => {
  try {
    const {
      teacherName, idNo, gender, subject, section, time, phone, email, class: className, date,
    } = req.body;

    // Validate required fields
    if (!teacherName || !idNo || !gender || !subject || !section || !time || !phone || !email || !className || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if idNo already exists
    const existingSchedule = await ClassSchedule.findOne({ idNo });
    if (existingSchedule) {
      return res.status(400).json({ message: `ID number '${idNo}' already exists. Please use a unique ID.` });
    }

    // Create new schedule
    const newSchedule = new ClassSchedule({
      teacherName,
      idNo,
      gender,
      subject,
      section,
      time,
      phone,
      email,
      class: className,
      date,
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json({ message: 'Schedule added successfully', schedule: savedSchedule });
  } catch (error) {
    console.error('Error adding  schedule:', error);
    res.status(500).json({ message: 'Error adding schedule', error });
  }
};

  
  // Get all  schedules
  exports.getAllSchedules = async (req, res) => {
    try {
      const schedules = await ClassSchedule.find();
      res.status(200).json(schedules);
    } catch (error) {
      console.error('Error fetching  schedules:', error);
      res.status(500).json({ message: 'Error fetching  schedules', error });
    }
  };
  
  // Update a  schedule
  exports.updateSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSchedule = await ClassSchedule.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedSchedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      res.status(200).json({ schedule: updatedSchedule });
    } catch (error) {
      console.error('Error updating  schedule:', error);
      res.status(500).json({ message: 'Error updating  schedule', error });
    }
  };
  
  // Delete a teacher schedule
  exports.deleteSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSchedule = await ClassSchedule.findByIdAndDelete(id);
  
      if (!deletedSchedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      console.error('Error deleting teacher schedule:', error);
      res.status(500).json({ message: 'Error deleting teacher schedule', error });
    }
  };
  