const express = require('express');
const dotenv = require('dotenv').config();
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
var cors = require('cors');
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(cors());

// @desc    Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// @desc    Test Route
app.use('/api/test', require('./routes/test'));

// @desc    Users Route
app.use('/api/user', require('./routes/userRoutes'));

// @desc     Form Route
app.use('/api/form', require('./routes/formRoutes'));

// @desc     Form Data Upload Route
app.use('/api/form/data', require('./routes/formDataRoutes'));

// @desc     Subject Data Route
app.use('/api/subject', require('./routes/subjectRoutes'));

// @desc     Quiz Data Route
app.use('/api/quiz', require('./routes/quizRoutes'));

// @desc     Assignment Data Route
app.use('/api/assignment', require('./routes/assignmentRoutes'));

// desc      Mid Data Route
app.use('/api/mid', require('./routes/midRoutes'));

// desc      Final Data Route
app.use('/api/final', require('./routes/finalRoutes'));

// desc      Lecture Notes Data Route
app.use('/api/lecturenotes', require('./routes/noteRoutes'));



// @desc    ErrorHandlers
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
})