const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/logout', authController.logout_get);

module.exports = router;
