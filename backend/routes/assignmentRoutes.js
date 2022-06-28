const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// const { getFormData, postFormData } = require('../controllers/formDataController');
const { getAssignments, getSingleAssignment, postAssignment, patchAssignment , deleteAssignment } = require('../controllers/assignmentController');

router.get('/:subjectId', getAssignments); 
router.get('/:id', getSingleAssignment); 
router.post('/', postAssignment); 
router.patch('/:id', patchAssignment);
router.delete('/:id', deleteAssignment);

module.exports = router;