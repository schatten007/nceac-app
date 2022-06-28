const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// const { getFormData, postFormData } = require('../controllers/formDataController');
const { getFinals , getSingleFinal, postFinal, patchFinal , deleteFinal } = require('../controllers/finalController');

router.get('/:subjectId', getFinals); 
router.get('/:id', getSingleFinal); 
router.post('/', postFinal); 
router.patch('/:id', patchFinal);
router.delete('/:id', deleteFinal);

module.exports = router;