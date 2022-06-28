const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'subjects',
    required: [true, 'Add a Subject to reference']
},
});

const note = new mongoose.model("notes",noteSchema)

module.exports = note; 