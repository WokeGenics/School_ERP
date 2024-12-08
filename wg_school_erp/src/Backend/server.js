const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const examRoutes = require('./routes/examRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const classRoutineRoutes = require('./routes/classRoutineRoutes');
const transportRoutes = require('./routes/transportRoutes'); 
const hostelRoomRoutes= require('./routes/hostelRoomRoutes');
const noticeRoutes = require("./routes/noticeRoutes");
const userMessageRoutes = require("./routes/userMessageRoutes");
const classScheduleRoutes = require('./routes/classScheduleRoutes');
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin
    methods: 'GET,POST,PUT, DELETE',              // Specify allowed methods (GET, POST, etc.)
    credentials: true                 // Include credentials if needed
  };

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/class-routines', classRoutineRoutes);
app.use('/api/transport', transportRoutes); 
app.use('/api/hostel-rooms', hostelRoomRoutes); 
app.use('/api/notices', noticeRoutes);
app.use('/api', userMessageRoutes);
app.use('/api', classScheduleRoutes);
// Serve login HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
