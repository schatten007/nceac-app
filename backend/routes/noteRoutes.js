const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getNotes , getSingleNote , postNote , patchNote , deleteNote } = require('../controllers/lectureNotesController');

router.get('/:subjectId', getNotes); 
router.get('/:id', getSingleNote); 
router.post('/', postNote); 
router.patch('/:id', patchNote);
router.delete('/:id', deleteNote);

module.exports = router;