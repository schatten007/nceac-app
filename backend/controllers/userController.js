const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const subject = require('../models/subjectModel');

// @desc    Resgister New User
// @route   POST /api/user
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!email || !name || !password || !role) {
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
        password: hashedPassword,
        role
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
        throw new Error('Oops, something went wrong. Couldnt create new User');
    }

    res.status(200).json({ message: 'Register User ', email, name, password, role });
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
    const { _id, name, email, role } = await User.findById(req.body.id);
    // const { _id, name, email } = await User.findById(req.user.id);

    const userSubject = await subject.find({assignedTo: _id});

    res.status(200).json({
        id: _id,
        name,
        email,
        userSubject,
        role
    });
})

const getUserList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = await User.findById(id);

    if(role!=='admin'){
        res.status(400);
        throw new Error('Access Denied');
    }

    const userList = await User.find({})
    // const userSubject = await subject.find({assignedTo: _id});

    res.status(200).json({
        userList
    });
})

const modifyUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const { role } = await User.findById(id);

    if(role!=='admin'){
        res.status(400);
        throw new Error('Access Denied');
    }

    const user = await User.findById(userId);
    const userRole = user.role;

    if(!userRole){
        res.status(400);
        throw new Error('No User Role Found');
    }
    if(id === userId){
        res.status(400);
        throw new Error('Sike, you thought');
    }

    let newRole = 'user';
    if(userRole==='user'){
        newRole = 'admin'
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {$set: { role: newRole}})
    // const userSubject = await subject.find({assignedTo: _id});

    res.status(200).json({
        updatedUser
    });
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.params;
    const { role } = await User.findById(id);

    if(role!=='admin'){
        res.status(400);
        throw new Error('Access Denied');
    }

    if(id === userId){
        res.status(400);
        throw new Error('Sike, you thought');
    }

    console.log(`User ID ${userId}`)
    const deletedUser = await User.findByIdAndRemove(userId);
    // const userSubject = await subject.find({assignedTo: _id});

    console.log('Deleted User', deletedUser);

    res.status(200).json({
        deletedUser
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
    getMe,
    getUserList,
    modifyUser,
    deleteUser
}