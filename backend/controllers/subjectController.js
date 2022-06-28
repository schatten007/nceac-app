
const asyncHandler = require('express-async-handler');
const subject = require('../models/subjectModel');

// @desc    Form Route
// @route   GET /api/subject
// @access  Private
const getSubjects = asyncHandler(async (req, res) => {
    try {
      const subjectdata = await subject.find().populate('assignedTo');
      res.status(201).json(subjectdata);
      console.log(subjectdata);
    } catch (error) {
      res.status(422).json(error);
    }
  });

  const getSubjectByRole = asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      const { role, userId } = req.body;
      if(role==='admin'){
        const subjectdata = await subject.find().populate('assignedTo');
        res.status(201).json(subjectdata);
        console.log(subjectdata);
      }
      else if(role==='user'){
        const subjectdata = await subject.find({assignedTo: userId}).populate('assignedTo');
        res.status(201).json(subjectdata);
        console.log(subjectdata);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  });

// @desc    Form Route
// @route   GET /api/subject/:id
// @access  Private
const getSingleSubject = asyncHandler(async (req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
  
      const subjectindividual = await subject.findById({ _id: id }); // Check if we are getting user from db
      console.log(subjectindividual);
      res.status(201).json(subjectindividual);
    } catch (error) {
      res.status(422).json(error);
    }
  });


// @desc    Form Route
// @route   POST /api/subject
// @access  Private
const postSubject = asyncHandler(async (req, res) => {
    const { subjectName, department, section, sessionYear, assignedTo } = req.body;
    const completion = {
      quiz: {
        current: 0,
        total: 4
      },
      assignment: {
        current: 0,
        total: 4
      },
      mid: {
        current: 0,
        total: 1
      },
      final: {
        current: 0,
        total: 1
      }
    }
  
    if (!subjectName || !department || !section || !sessionYear || !assignedTo ) {
      res.status(422).json("Please fill all the fields");
    }
  
    try {
          const addsubject = new subject({
            subjectName, department, section, sessionYear, completion, assignedTo
        });
  
        await addsubject.save(); // save this to our database
        console.log(addsubject);
        return res.status(201).json(addsubject);
      // }
    } catch (error) {
      res.status(422).json(error);
    }
  })


// @desc    Form Route
// @route   PUT /api/subject/:id
// // @access  Private
const patchSubject = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedsubject = await subject.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true, // Get the updated value
        }
      );
  
      console.log(updatedsubject);
      return res.status(201).json(updatedsubject);
    } catch (error) {
      res.status(422).json(error);
    }
  }
)

// // @desc    Form Route
// // @route   DELETE /api/subject/:id
// // @access  Private
const deleteSubject = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedsubject = await subject.findByIdAndDelete({
        _id: id,
      });
  
      console.log(deletedsubject);
      res.status(201).json(deletedsubject);
    } catch (error) {
      res.status(422).json(error);
    }
  })

module.exports = {
    getSubjects,
    getSingleSubject,
    postSubject,
    patchSubject,
    deleteSubject,
    getSubjectByRole
}