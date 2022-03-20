const { default: axios } = require('axios');
const cheerio = require('cheerio');
const asyncHandler = require('express-async-handler');
// const Test = require('../models/testModel');
// const User = require('../models/userModel');
const Form = require('../models/formModel');

// @desc    Form Route
// @route   GET /api/form
// @access  Private
const getForm = asyncHandler(async (req, res) => {
    const forms = await Form.find({});
    res.status(200).json(forms);
})


// @desc    Form Route
// @route   POST /api/form
// @access  Private
const postForm = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.url) {
        res.status(400)
        throw new Error('Form Data Incomplete');
    }

    const response = await axios(req.body.url);
    const html = response.data;
    const $ = cheerio.load(html);

    const inputs = [];


    // @desc    clone form name/id, type, placeholder 
    $("form :input").each(function (i) {
        const name = $(this).attr("name");
        const id = $(this).attr("id");
        const type = $(this).attr("type");
        const placeholder = $(this).attr("placeholder");

        // Assigns value if defined else assigns string undefined
        function assignDefined(target, source) {
            Object.keys(source).map((key, index) => {
                if (source[key] !== undefined) {
                    target[key] = source[key];
                } else {
                    target[key] = "undefined"
                }
            });

            return target;
        }

        const formInput = assignDefined({}, {
            name,
            id,
            type,
            placeholder
        });

        inputs.push(formInput);
    })


    console.log(inputs);

    // Clone form to DB HERE
    const form = await Form.create({
        name: req.body.name,
        url: req.body.url,
        inputs: inputs
    });
    console.log('Saved Form');


    res.status(200).json({
        message: 'Got ze form',
        url: req.body.url,
        inputs: inputs
    });
})


// @desc    Form Route
// @route   PUT /api/form/:id
// // @access  Private
const putForm = asyncHandler(async (req, res) => {
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
const deleteForm = asyncHandler(async (req, res) => {
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
    getForm,
    postForm,
    putForm,
    deleteForm
}