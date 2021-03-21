const express = require('express');
const {
  createBoard,
  getBoards,
  getBoardById,
  deleteBoardById,
} = require('../controllers/board.controller');

const router = express.Router();

router.post('/', createBoard);
router.get('/all', getBoards);
router.get('/', getBoardById);
router.get('/delete', deleteBoardById);

module.exports = router;
