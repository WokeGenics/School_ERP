const Exam = require('../models/Exam');

// Fetch all exams
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam schedules', error: error.message });
  }
};

// Add a new exam
exports.addExam = async (req, res) => {
  const { examName, subjectType, class: className, section, time, date } = req.body;

  try {
    const newExam = new Exam({ examName, subjectType, class: className, section, time, date });
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(500).json({ message: 'Error adding exam schedule', error: error.message });
  }
};
