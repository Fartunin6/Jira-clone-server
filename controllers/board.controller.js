const Board = require('../models/Board');
const { CREATE_BOARD, GET_BOARD, GET_BOARDS, DELETE_BOARD } = require('../snippets/board');

const getAllBoards = (userId) => {
  return Board.find({ userId })
    .exec()
    .then((boards) => boards)
    .catch(() =>
      response.status(400).json({
        error: GET_BOARDS.ERROR_MESSAGE,
      }),
    );
};

exports.createBoard = (request, response) => {
  const { userId } = request;
  const { title, description, background } = request.body;

  const board = new Board({ title, description, userId, background });

  board.save(async (error, board) => {
    if (error || !board) {
      return response.status(400).json({
        error: CREATE_BOARD.ERROR_MESSAGE,
      });
    }

    const boards = await getAllBoards(userId).then((boards) => boards);

    return response.status(200).json({
      message: CREATE_BOARD.SUCCESSFUL_MESSAGE,
      boards,
    });
  });
};

exports.getBoards = (request, response) => {
  const { userId } = request;

  Board.find({ userId }).exec((error, boards) => {
    if (error || !boards) {
      return response.status(400).json({
        error: GET_BOARDS.ERROR_MESSAGE,
      });
    }

    return response.status(200).json({
      boards,
    });
  });
};

exports.getBoardById = (request, response) => {
  const { id } = request.query;

  Board.findOne({ _id: id }).exec((error, board) => {
    if (error || !board) {
      return response.status(400).json({
        error: GET_BOARD.ERROR_MESSAGE,
      });
    }

    return response.status(200).json({
      board,
    });
  });
};

exports.deleteBoardById = (request, response) => {
  const { userId } = request;
  const { id } = request.query;

  Board.deleteOne({ _id: id }).exec(async (error, board) => {
    if (error) {
      return response.status(400).json({
        error: DELETE_BOARD.ERROR_MESSAGE,
      });
    }

    const boards = await getAllBoards(userId).then((boards) => boards);

    return response.status(200).json({
      message: DELETE_BOARD.SUCCESSFUL_MESSAGE,
      boards,
    });
  });
};

exports.updateBoard = (request, response) => {
  const { userId } = request;
  const { id, newFields } = request.body;

  Board.updateOne({ _id: id }, newFields, async (error, result) => {
    if (error || !result) {
      return response.status(400).json({
        error: 'Updating board is failed',
      });
    }

    const boards = await getAllBoards(userId).then((boards) => boards);

    return response.status(200).json({
      boards,
    });
  });
};
