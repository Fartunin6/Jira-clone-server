const express = require('express');
const {
  createBoard,
  getBoards,
  getBoardById,
  deleteBoardById,
} = require('../controllers/board.controller');

const { createBoardValidator } = require('../validators/board');
const { runValidation } = require('../validators');

const router = express.Router();

router.post('/', createBoardValidator, runValidation, createBoard);
router.get('/all', getBoards);
router.get('/', getBoardById);
router.get('/delete', deleteBoardById);

module.exports = router;
