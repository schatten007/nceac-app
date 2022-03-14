const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc    Resgister New User
// @route   POST /api/user
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            message: 'User Created',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }

    res.status(200).json({ message: 'Register User ' });
})



// @desc    Authenticate User
// @route   POST /api/user/login
// @access  Public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: 'Logged In As',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
})



// @desc    Get user data
// @route   POST /api/user/me
// @access  Private 
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
})

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}