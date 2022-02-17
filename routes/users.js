const router = require('express').Router();
const {
  getUsers, getUserByID, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserData } = require('../middlewares/validation');

router.get('/api/users/me', getCurrentUser);
router.patch('/api/users/me', validateUserData, updateUser);

module.exports = router;
