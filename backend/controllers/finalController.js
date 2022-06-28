const asyncHandler = require('express-async-handler');
const final = require('../models/finalsModel');
const subject = require('../models/subjectModel');

// @desc    Form Route
// @route   POST /api/final
// @access  Private
const postFinal = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { title, questionurl, besturl, averageurl, worsturl, marksurl, subjectid } = req.body;

    console.log(title, questionurl, besturl, averageurl, worsturl, marksurl, subjectid)

    if (!title || !questionurl || !besturl || !averageurl || !worsturl || !marksurl || !subjectid) {
      res.status(422).json("Please fill all the fields");
    }
  
    try {
      const preDoc = await final.findOne({
        title: title,
      });
      console.log(preDoc);
  
      if (preDoc) {
        return res.status(422).json("This Title is already present.");
      } else {
        const addDoc = new final({
          title: title,
          questionurl,
          besturl,
          averageurl,
          worsturl,
          marksurl,
          subject: subjectid
        });
  
        const subjectState = await subject.findById(subjectid);
        if(subjectState.completion.final.current >= subjectState.completion.final.total){
          return res.status(422).json('Final Limit Reached');
        }

        const incrementFinal = await subject.findByIdAndUpdate(subjectid, {$inc : {'completion.final.current': 1}});

        await addDoc.save(); // save this to our database
        return res.status(201).json(addDoc);
        console.log(addDoc);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  });

// @desc    Form Route
// @route   GET /api/final
// @access  Private
const getFinals = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId;

  if(!subjectId){
    res.status(400)
    throw new Error('Please add Subject Id');
  }

  try {
    const docData = await final.find( { subject: subjectId } );
    res.status(201).json(docData);
    console.log(docData);
  } catch (error) {
    res.status(422).json(error);
    }
  });


// @desc    Form Route
// @route   POST /api/final/:id
// @access  Private
const getSingleFinal = asyncHandler(async (req, res) => {
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
// @route   PATCH /api/final/:id
// // @access  Private
const patchFinal = asyncHandler(async (req, res) => {
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
// // @route   DELETE /api/final/:id
// // @access  Private
const deleteFinal = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteDoc = await final.findByIdAndDelete({
        _id: id,
      });
  
      console.log(deleteDoc);
      res.status(201).json(deleteDoc);
    } catch (error) {
      res.status(422).json(error);
    }
  })

module.exports = {
    getFinals,
    getSingleFinal,
    postFinal,
    patchFinal,
    deleteFinal,
}