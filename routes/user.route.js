const express = require('express');

// import controllers
const { getMe, getAllUsers } = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', getMe);
router.get('/all', getAllUsers);

module.exports = router;
