const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// const { getFormData, postFormData } = require('../controllers/formDataController');
const { getSubjects, getSubjectByRole,  getSingleSubject, postSubject, patchSubject, deleteSubject } = require('../controllers/subjectController');

router.get('/:role', getSubjects); //
router.post('/', getSubjectByRole);
router.get('/:id', getSingleSubject); 
router.post('/add', postSubject); 
router.patch('/:id', patchSubject);
router.delete('/:id', deleteSubject);

module.exports = router;