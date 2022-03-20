const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getForm, postForm } = require('../controllers/formController');
const { printFormData } = require('../controllers/formSubmitController');

router.get('/', getForm);
router.get('/print/:id', printFormData);
router.post('/', postForm);
// router.put('/:id', putForm);
// router.delete('/:id', deleteForm);

module.exports = router;