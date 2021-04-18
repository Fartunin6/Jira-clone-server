const express = require('express');
const router = express.Router();
const {
  getBackgrounds,
  createBackground,
  deleteBackgroundById,
  getBackgroundsByIds,
} = require('../controllers/backgrounds.controller');

router.get('/all', getBackgrounds);
router.post('/', createBackground);
router.get('/delete', deleteBackgroundById);
router.get('/', getBackgroundsByIds);

module.exports = router;
