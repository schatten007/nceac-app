const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({

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

const quiz = new mongoose.model("quizzes",quizSchema)

module.exports = quiz; 