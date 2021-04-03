const express = require('express');
const {
  createBoard,
  getUserBoards,
  getBoards,
  getBoardById,
  deleteBoardById,
  updateBoard,
} = require('../controllers/board.controller');

const { createBoardValidator } = require('../validators/board');
const { runValidation } = require('../validators');

const router = express.Router();

router.post('/', createBoardValidator, runValidation, createBoard);
router.get('/user-boards', getUserBoards);
router.get('/all', getBoards);
router.get('/', getBoardById);
router.get('/delete', deleteBoardById);
router.patch('/update', updateBoard);

module.exports = router;
