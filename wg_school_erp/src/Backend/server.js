const express = require('express');
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload")
const dotenv = require('dotenv');
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const cloudinary = require("cloudinary"); 
const examRoutes = require('./routes/examRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const classRoutineRoutes = require('./routes/classRoutineRoutes');
const transportRoutes = require('./routes/transportRoutes'); 
const hostelRoomRoutes= require('./routes/hostelRoomRoutes');
const noticeRoutes = require("./routes/noticeRoutes");
const userMessageRoutes = require("./routes/userMessageRoutes");
const classScheduleRoutes = require('./routes/classScheduleRoutes');
const expenseRoutes = require("./routes/expenseRoutes");
const feesRoutes = require("./routes/feesRoutes");
const bookRoutes = require('./routes/bookRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const imageRoutes = require('./routes/imageRoutes')
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000 ;

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin
    methods: 'GET,POST,PUT, DELETE',              // Specify allowed methods (GET, POST, etc.)
    credentials: true                 // Include credentials if needed
  };



// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  app.get('/api/test-cloudinary', async (req, res) => {
    try {
      // Fetch Cloudinary account details
      const result = await cloudinary.api.ping();
      res.status(200).json({
        message: 'Cloudinary is connected successfully!',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to connect to Cloudinary.',
        error: error.message,
      });
    }
  });


// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true,limit:"50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));


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
app.use("/api/expenses", expenseRoutes);
app.use("/api/fee", feesRoutes);
app.use('/api', bookRoutes);
app.use("/api", teacherRoutes);
app.use("/api/teachers", imageRoutes);
// Serve login HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
