const Grade = require('../models/grade');

// Get all grades
exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error });
  }
};

// Create a new grade
exports.createGrade = async (req, res) => {
  try {
    const { gradeName, gradePoint, percentFrom, percentUpTo, comment } = req.body;
    const grade = new Grade({ gradeName, gradePoint, percentFrom, percentUpTo, comment });
    await grade.save();
    res.status(201).json({ message: 'Grade created successfully', grade });
  } catch (error) {
    res.status(500).json({ message: 'Error creating grade', error });
  }
};

// Update an existing grade
exports.updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGrade = await Grade.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.status(200).json({ message: 'Grade updated successfully', updatedGrade });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade', error });
  }
};

// Delete a grade
exports.deleteGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGrade = await Grade.findByIdAndDelete(id);
    if (!deletedGrade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.status(200).json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grade', error });
  }
};
