const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { postForm } = require('../controllers/formController');

// router.get('/', getForm);
router.post('/', postForm);
// router.put('/:id', putForm);
// router.delete('/:id', deleteForm);

module.exports = router;