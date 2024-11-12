const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin
    methods: 'GET,POST',              // Specify allowed methods (GET, POST, etc.)
    credentials: true                 // Include credentials if needed
  };

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
// Serve login HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
