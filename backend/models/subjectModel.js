const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: { // Numerical Computing , Arabic
    type: String,
    required: true,
  },
  department: { // BCS, BSE
    type: String,
    required: true,
  },
  section: { // A, B, C, D
    type: String,
    required: true,
  },
  sessionYear: { // FA18,SP22
    type: String,
    required: true, 
  },
  completion: {
    quiz: {
      current: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    assignment: {
      current: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    mid: {
      current: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    final: {
      current: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
  },
  assignedTo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'Add a User to reference']
},
});

const subject = new mongoose.model("subjects",subjectSchema)

module.exports = subject; 