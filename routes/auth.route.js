const express = require('express');

// import controller
const { signin, signup, accountActivation } = require('../controllers/auth.controller');

//import validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

const router = express.Router();

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router;
