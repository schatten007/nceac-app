const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getForm, postForm, deleteForm, patchForm} = require('../controllers/formController');
const { printFormData } = require('../controllers/formSubmitController');

router.get('/', getForm);
router.get('/print/:id', printFormData);
router.post('/', postForm);
router.patch('/:id', patchForm);
router.delete('/:id', deleteForm);

module.exports = router;