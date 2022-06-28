const asyncHandler = require('express-async-handler');
const quiz = require('../models/quizModel');
const subject = require('../models/subjectModel');

// @desc    Form Route
// @route   POST /api/quiz
// @access  Private
const postQuiz = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { title, questionurl, besturl, averageurl, worsturl, marksurl, subjectid } = req.body;

    console.log(title, questionurl, besturl, averageurl, worsturl, marksurl, subjectid)

    if (!title || !questionurl || !besturl || !averageurl || !worsturl || !marksurl || !subjectid) {
      res.status(422).json("Please fill all the fields");
    }
  
    try {
      const prequiz = await quiz.findOne({
        title: title,
      });
  
      if (prequiz) {
        return res.status(422).json("This Quiz Title is already present.");
      } else {
        const addquiz = new quiz({
          title: title,
          questionurl,
          besturl,
          averageurl,
          worsturl,
          marksurl,
          subject: subjectid
        });
  
        const subjectState = await subject.findById(subjectid);
        if(subjectState.completion.quiz.current >= subjectState.completion.quiz.total){
          return res.status(422).json('Quiz Limit Reached');
        }

        const incrementQuiz = await subject.findByIdAndUpdate(subjectid, {$inc : {'completion.quiz.current': 1}});
        
        await addquiz.save(); // save this to our database

        return res.status(201).json(addquiz);
        console.log(addquiz);
      }
    } catch (error) {
      res.status(422).json(error);
    }
  });

// @desc    Form Route
// @route   GET /api/quiz
// @access  Private
const getQuizzes = asyncHandler(async (req, res) => {
  const subjectId = req.params.subjectId;

  if(!subjectId){
    res.status(400)
    throw new Error('Please add Subject Id');
  }

  try {
    const quizdata = await quiz.find( { subject: subjectId } );
    res.status(201).json(quizdata);
    console.log(quizdata);
  } catch (error) {
    res.status(422).json(error);
    }
  });


// @desc    Form Route
// @route   POST /api/quiz/:id
// @access  Private
const getSingleQuiz = asyncHandler(async (req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
  
      const quizindividual = await quiz.findById({ _id: id }); // Check if we are getting user from db
      console.log(quizindividual);
      res.status(201).json(quizindividual);
    } catch (error) {
      res.status(422).json(error);
    }
  })


// @desc    Form Route
// @route   PATCH /api/quiz/:id
// // @access  Private
const patchQuiz = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedquiz = await quiz.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true, // Get the updated value
        }
      );
  
      console.log(updatedquiz);
      res.status(201).json(updatedquiz);
    } catch (error) {
      res.status(422).json(error);
    }
  }
)

// // @desc    Form Route
// // @route   DELETE /api/quiz/:id
// // @access  Private
const deleteQuiz = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedquiz = await quiz.findByIdAndDelete({
        _id: id,
      });
  
      console.log(deletedquiz);
      res.status(201).json(deletedquiz);
    } catch (error) {
      res.status(422).json(error);
    }
  })

module.exports = {
    getQuizzes,
    getSingleQuiz,
    postQuiz,
    patchQuiz,
    deleteQuiz,
}