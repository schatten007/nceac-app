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

// @desc    ErrorHandlers
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
})