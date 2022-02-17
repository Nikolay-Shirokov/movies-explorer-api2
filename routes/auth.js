const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateNewUserData, validateAuthData } = require('../middlewares/validation');

router.post('/api/signin', validateAuthData, login);
router.post('/api/signup', validateNewUserData, createUser);

module.exports = router;
