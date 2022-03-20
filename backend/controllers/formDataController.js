const asyncHandler = require('express-async-handler');
const FormData = require('../models/formDataModel');

// @desc    Form Route
// @route   GET /api/form/data/:id
// @access  Private
const getFormData = asyncHandler(async (req, res) => {
    console.log(req.params)
    if (!req.params.id) {
        res.status(400);
        throw new Error('Form ID not found in request');
    }

    const formData = await FormData.where("formId").equals(req.params.id).populate("createdBy");

    if (!formData) {
        res.status(500);
        throw new Error('No Data Associated with FormID')
    }

    res.status(200).json({
        message: 'Got ze form data',
        request: req.params,
        response: formData
    });
})


// @desc    Form Route
// @route   POST /api/form/data
// @access  Private
const postFormData = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Form Data Incomplete');
    }

    const inputData = [];


    for (const [key, value] of Object.entries(req.body.values)) {
        inputData.push({
            name: key,
            value: value
        })
    }

    // Add form data to DB HERE
    const formData = await FormData.create({
        createdBy: req.body.createdBy,
        formId: req.body.id,
        data: inputData
    });
    console.log('Saved Form ' + formData);


    res.status(200).json({
        message: 'Got ze form data',
        formData: inputData,
        formID: req.body.id,
        createdBy: req.body.createdBy
    });
})


// @desc    Form Route
// @route   PUT /api/form/:id
// // @access  Private
const putFormData = asyncHandler(async (req, res) => {
    // const test = await Test.findById(req.params.id);

    // if (!test) {
    //     res.status(400);
    //     throw Error('No test found. Recheck ID');
    // }

    // const user = await User.findById(req.user.id);

    // // Check user exists
    // if (!user) {
    //     res.status(401);
    //     throw new Error('User not found')
    // }

    // // Check if test user is same as token user
    // if (test.user.toString() != user.id) {
    //     res.status(401);
    //     throw new Error('User not authorized');
    // }

    // const newTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true
    // });

    // res.json(newTest);
}
)

// // @desc    Form Route
// // @route   DELETE /api/form/:id
// // @access  Private
const deleteFormData = asyncHandler(async (req, res) => {
    // const test = Test.findById(req.params.id);

    // if (!test) {
    //     res.status(400);
    //     throw Error('No test found. Recheck ID');
    // }


    // const user = await User.findById(req.user.id);

    // // Check user exists
    // if (!user) {
    //     res.status(401);
    //     throw new Error('User not found')
    // }

    // // Check if test user is same as token user
    // if (test.user.toString() != user.id) {
    //     res.status(401);
    //     throw new Error('User not authorized');
    // }

    // await Test.findByIdAndDelete(req.params.id);
    // res.json(({ message: `Deleting data with id ${req.params.id}` }))
})

module.exports = {
    getFormData,
    postFormData,
    putFormData,
    deleteFormData
}