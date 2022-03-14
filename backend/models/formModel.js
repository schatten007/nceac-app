const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a form']
    },
    url: {
        type: String,
        required: [true, 'Please add a form URL']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Form', formSchema);