const mongoose = require("mongoose");

const midSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  questionurl: {
    type: String,
    required: true,
  },
  besturl: {
    type: String,
    required: true,
  },
  averageurl: {
    type: String,
    required: true,
  },
  worsturl: {
    type: String,
    required: true,
  },
  marksurl: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'subjects',
    required: [true, 'Add a Subject to reference']
},
});

const mid = new mongoose.model("mids",midSchema)

module.exports = mid; 