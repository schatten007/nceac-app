const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a form']
    },
    url: {
        type: String,
        required: [true, 'Please add a form URL']
    },
    inputs: [{
        name: {
            type: String,
            required: [true, 'Missing Name Attribute']
        },
        id: {
            type: String,
            required: [true, 'Missing id Attribute']
        },
        type: {
            type: String,
            required: [true, 'Missing type Attribute']
        },
        placeholder: {
            type: String,
            required: [true, 'Missing placeholder Attribute']
        }
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model('Form', formSchema);