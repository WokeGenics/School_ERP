// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

// Removed: const cloudinary = require("cloudinary"); <-- no longer needed

const examRoutes = require("./routes/examRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const classRoutineRoutes = require("./routes/classRoutineRoutes");
const transportRoutes = require("./routes/transportRoutes");
const hostelRoomRoutes = require("./routes/hostelRoomRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const userMessageRoutes = require("./routes/userMessageRoutes");
const classScheduleRoutes = require("./routes/classScheduleRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const feesRoutes = require("./routes/feesRoutes");
const bookRoutes = require("./routes/bookRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const imageRoutes = require("./routes/imageRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
const uploadRoute = require("./routes/upload"); // Our upload route
app.use("/api/upload", uploadRoute);


// Removed all Cloudinary setup/config and test routes

// Routes
app.use("/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/class-routines", classRoutineRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/hostel-rooms", hostelRoomRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api", userMessageRoutes);
app.use("/api", classScheduleRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/fee", feesRoutes);
app.use("/api", bookRoutes);
app.use("/api", teacherRoutes);
app.use("/api/teachers", imageRoutes);
app.use("/api", admissionRoutes);
app.use("/api/students", studentRoutes);




app.use(express.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Serve login HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
