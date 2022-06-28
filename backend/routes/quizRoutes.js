const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// const { getFormData, postFormData } = require('../controllers/formDataController');
const { getQuizzes, getSingleQuiz, postQuiz, patchQuiz, deleteQuiz } = require('../controllers/quizController');

router.get('/:subjectId', getQuizzes); 
router.get('/:id', getSingleQuiz); 
router.post('/', postQuiz); 
router.patch('/:id', patchQuiz);
router.delete('/:id', deleteQuiz);

module.exports = router;