const router = require('express').Router();
const {
  getUsers, getUserByID, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserData } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserData, updateUser);

module.exports = router;
