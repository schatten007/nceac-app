const asyncHandler = require('express-async-handler');
const Test = require('../models/testModel');
const User = require('../models/userModel');

// @desc    Test Route
// @route   GET /api/test
// @access  Private
const getTest = asyncHandler(async (req, res) => {
    const names = await Test.find({ user: req.user.id });
    res.status(200).json(names);
})
// @desc    Test Route
// @route   POST /api/test
// @access  Private
const postTest = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name field');
    }

    const test = await Test.create({
        name: req.body.name,
        user: req.user.id
    });

    res.status(200).json(test);
})
// @desc    Test Route
// @route   PUT /api/test/:id
// @access  Private
const putTest = asyncHandler(async (req, res) => {
    const test = await Test.findById(req.params.id);

    if (!test) {
        res.status(400);
        throw Error('No test found. Recheck ID');
    }

    const user = await User.findById(req.user.id);

    // Check user exists
    if (!user) {
        res.status(401);
        throw new Error('User not found')
    }

    // Check if test user is same as token user
    if (test.user.toString() != user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const newTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.json(newTest);
}
)

// @desc    Test Route
// @route   DELETE /api/test/:id
// @access  Private
const deleteTest = asyncHandler(async (req, res) => {
    const test = Test.findById(req.params.id);

    if (!test) {
        res.status(400);
        throw Error('No test found. Recheck ID');
    }


    const user = await User.findById(req.user.id);

    // Check user exists
    if (!user) {
        res.status(401);
        throw new Error('User not found')
    }

    // Check if test user is same as token user
    if (test.user.toString() != user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await Test.findByIdAndDelete(req.params.id);
    res.json(({ message: `Deleting data with id ${req.params.id}` }))
})

module.exports = {
    getTest,
    postTest,
    putTest,
    deleteTest
}