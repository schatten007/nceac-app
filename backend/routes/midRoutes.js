const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// const { getFormData, postFormData } = require('../controllers/formDataController');
const { getMids , getSingleMid, postMid, patchMid , deleteMid } = require('../controllers/midController');

router.get('/:subjectId', getMids); 
router.get('/:id', getSingleMid); 
router.post('/', postMid); 
router.patch('/:id', patchMid);
router.delete('/:id', deleteMid);

module.exports = router;