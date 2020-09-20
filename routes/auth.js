const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');
// const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/logIn', authController.getLogIn);

router.post('/login', authController.postLogIn);

router.post('/logOut', authController.postLogOut);

router.get('/signUp', authController.getSignUp);

router.post('/signUp', authController.postSignUp);

module.exports = router;