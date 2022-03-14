const express = require('express');
const router = express.Router();
const { getTest, postTest, putTest, deleteTest } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');


router.get('/', protect, getTest)

router.post('/', protect, postTest)

router.put('/:id', protect, putTest)

router.delete('/:id', protect, deleteTest)


module.exports = router;