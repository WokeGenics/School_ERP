const Attendance = require('../models/Attendance');

// Fetch attendance data
exports.getAttendance = async (req, res) => {
  try {
    const attendanceData = await Attendance.findOne({});
    if (!attendanceData) return res.status(404).json({ message: 'No attendance data found' });
    res.json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance data', error: error.message });
  }
};

// Save or update attendance data
exports.saveAttendance = async (req, res) => {
  const { class: className, section, month, session, students } = req.body;

  try {
    // Simulate generating mock student data
    const sampleStudents = [
      { name: 'Michele Johnson', attendance: [] },
      { name: 'Richi Akon', attendance: [] },
      { name: 'Amanda Kherr', attendance: [] },
    ];

    const newAttendance = {
      class: className,
      section,
      month,
      session,
      students: sampleStudents.map((student) => ({
        ...student,
        attendance: Array(31).fill().map(() => (Math.random() > 0.5 ? 'Present' : 'Absent')),
      })),
    };

    let attendanceData = await Attendance.findOne({});
    if (attendanceData) {
      // Update existing data
      attendanceData = Object.assign(attendanceData, newAttendance);
      await attendanceData.save();
    } else {
      // Save new data
      attendanceData = new Attendance(newAttendance);
      await attendanceData.save();
    }

    res.status(201).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: 'Error saving attendance data', error: error.message });
  }
};
