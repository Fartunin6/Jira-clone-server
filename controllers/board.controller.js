const Board = require('../models/Board');

exports.createBoard = (request, response) => {
  const { userId, title, description } = request.body;

  const board = new Board({ title, description, userId });

  board.save((error, board) => {
    if (error || !board) {
      console.error(error);
      return response.status(400).json({
        error: 'Creating a new board is failed',
      });
    }

    return response.status(200).json({
      message: 'Board created successfuly',
      board,
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
  const { id } = request.query;

  Board.deleteOne({ _id: id }).exec((error, board) => {
    if (error) {
      return response.status(400).json({
        error: 'deleting board is failed',
      });
    }

    return response.status(200).json({
      message: 'board deleted successfuly',
    });
  });
};
