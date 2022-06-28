const asyncHandler = require('express-async-handler');
const mid = require('../models/midsModel');
const subject = require('../models/subjectModel');

// @desc    Form Route
// @route   POST /api/mid
// @access  Private
const postMid = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { title, questionurl, besturl, averageurl, worsturl, marksurl, subjectid } = req.body;

    console.log(title, questionurl, besturl, averageurl, worsturl, marksurl, subjectid)

    if (!title || !questionurl || !besturl || !averageurl || !worsturl || !marksurl || !subjectid) {
      res.status(422).json("Please fill all the fields");
    }
  
    try {
      const preDoc = await mid.findOne({
        title: title,
      });
      console.log(preDoc);
  
      if (preDoc) {
        return res.status(422).json("This Title is already present.");
      } else {
        const addDoc = new mid({
          title: title,
          questionurl,
          besturl,
          averageurl,
          worsturl,
          marksurl,
          subject: subjectid
        });

        const subjectState = await subject.findById(subjectid);
        if(subjectState.completion.mid.current >= subjectState.completion.mid.total){
          return res.status(422).json('Mid Limit Reached');
        }

        const incrementQuiz = await subject.findByIdAndUpdate(subjectid, {$inc : {'completion.mid.current': 1}});
  
        await addDoc.save(); // save this to our database
        return res.status(201).json(addDoc);
        console.log(addDoc);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  });

// @desc    Form Route
// @route   GET /api/mid
// @access  Private
const getMids = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId;

  if(!subjectId){
    res.status(400)
    throw new Error('Please add Subject Id');
  }

  try {
    const docData = await mid.find( { subject: subjectId } );
    res.status(201).json(docData);
    console.log(docData);
  } catch (error) {
    res.status(422).json(error);
    }
  });


// @desc    Form Route
// @route   POST /api/mid/:id
// @access  Private
const getSingleMid = asyncHandler(async (req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
  
      const docIndividual = await mid.findById({ _id: id }); // Check if we are getting user from db
      console.log(docIndividual);
      res.status(201).json(docIndividual);
    } catch (error) {
      res.status(422).json(error);
    }
  })


// @desc    Form Route
// @route   PATCH /api/mid/:id
// // @access  Private
const patchMid = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updateDoc = await mid.findByIdAndUpdate(
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
// // @route   DELETE /api/mid/:id
// // @access  Private
const deleteMid = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteDoc = await mid.findByIdAndDelete({
        _id: id,
      });
  
      console.log(deleteDoc);
      res.status(201).json(deleteDoc);
    } catch (error) {
      res.status(422).json(error);
    }
  })

module.exports = {
    getMids,
    getSingleMid,
    postMid,
    patchMid,
    deleteMid,
}