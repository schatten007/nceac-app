const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUserList, modifyUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/me', getMe);
router.post('/list/:id', getUserList);
router.patch('/:id', modifyUser);
router.delete('/:id/:userId', deleteUser);
// router.post('/me', protect, getMe);


module.exports = router;