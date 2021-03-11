const express = require('express');

// import controllers
const { getMe } = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', getMe);

module.exports = router;
