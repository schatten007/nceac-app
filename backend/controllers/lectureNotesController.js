const asyncHandler = require('express-async-handler');
const note = require('../models/lectureNoteModel');

// @desc    Form Route
// @route   POST /api/lecturenotes
// @access  Private
const postNote = asyncHandler(async (req, res) => {
    console.log('Postnote got hit')
    const { title, description, url, subjectid } = req.body;

    console.log(title, description, url, subjectid)

    if (!title || !url, !subjectid) {
      res.status(422).json("Please fill all the fields");
    }
  
    try {
      const preDoc = await note.findOne({
        title: title,
      });
      console.log(preDoc);
  
      if (preDoc) {
        return res.status(422).json("This Title is already present.");
      } else {
        const addDoc = new note({
          title,
          description,
          url,
          subject: subjectid
        });
  
        await addDoc.save(); // save this to our database
        return res.status(201).json(addDoc);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  });

// @desc    Form Route
// @route   GET /api/lecturenotes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId;

  if(!subjectId){
    res.status(400)
    throw new Error('Please add Subject Id');
  }

  try {
    const docData = await note.find( { subject: subjectId } );
    res.status(201).json(docData);
    console.log(docData);
  } catch (error) {
    res.status(422).json(error);
    }
  });


// @desc    Form Route
// @route   POST /api/lecturenotes/:id
// @access  Private
const getSingleNote = asyncHandler(async (req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
  
      const docIndividual = await final.findById({ _id: id }); // Check if we are getting user from db
      console.log(docIndividual);
      res.status(201).json(docIndividual);
    } catch (error) {
      res.status(422).json(error);
    }
  })


// @desc    Form Route
// @route   PATCH /api/lecturenotes/:id
// // @access  Private
const patchNote = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updateDoc = await final.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true, // Get the updated value
        }
      );
  
      console.log(updateDoc);
      res.status(201).json(updatedDoc);
    } catch (error) {
      res.status(422).json(error);
    }
  }
)

// // @desc    Form Route
// // @route   DELETE /api/lecturenotes/:id
// // @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    console.log('Hit delete')
    try {
      const { id } = req.params;
      const deleteDoc = await note.findByIdAndDelete({
        _id: id,
      });
  
      res.status(201).json(deleteDoc);
    } catch (error) {
      res.status(422).json(error);
    }
  })

module.exports = {
    getNotes,
    getSingleNote,
    postNote,
    patchNote,
    deleteNote,
}