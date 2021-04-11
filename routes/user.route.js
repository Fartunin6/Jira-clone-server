const express = require('express');

// import controllers
const {
  getMe,
  getAllUsers,
  getUsersByIds,
  deleteUserById,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', getMe);
router.get('/', getUsersByIds);
router.get('/delete', deleteUserById);
router.get('/all', getAllUsers);

module.exports = router;
