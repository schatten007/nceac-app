const mongoose = require('mongoose');

const formDataSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'Add a User to reference']
    },
    formId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Form',
        required: [true, 'Add a Form to reference']
    },
    data: [{
        name: {
            type: String,
            required: [true, 'Add Form Input Name']
        },
        value: {
            type: String,
            required: [false, 'Add Form Input Value']
        }
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model('FormData', formDataSchema);