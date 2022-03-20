const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getFormData, postFormData } = require('../controllers/formDataController');

router.get('/:id', getFormData);
router.post('/', postFormData);
// router.put('/:id', putForm);
// router.delete('/:id', deleteForm);

module.exports = router;