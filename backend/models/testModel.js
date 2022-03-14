const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name value']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Test', testSchema);