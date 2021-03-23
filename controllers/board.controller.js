const Board = require('../models/Board');

const getAllBoards = (userId) => {
  return Board.find({ userId })
    .exec()
    .then((boards) => boards);
};

exports.createBoard = (request, response) => {
  const { userId } = request;
  const { title, description, background } = request.body;

  const board = new Board({ title, description, userId, background });

  board.save(async (error, board) => {
    if (error || !board) {
      return response.status(400).json({
        error: 'Creating a new board is failed',
      });
    }

    const boards = await getAllBoards(userId).then((boards) => boards);

    return response.status(200).json({
      message: 'Board created successfuly',
      boards,
    });
  });
};

exports.getBoards = (request, response) => {
  const { userId } = request;

  Board.find({ userId }).exec((error, boards) => {
    if (error || !boards) {
      return response.status(400).json({
        error: 'finding boards is failed',
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
        error: 'finding board is failed',
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
        error: 'deleting board is failed',
      });
    }

    const boards = await getAllBoards(userId).then((boards) => boards);

    return response.status(200).json({
      message: 'Board deleted successfuly',
      boards,
    });
  });
};
