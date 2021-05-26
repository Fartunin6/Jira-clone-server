const Board = require('../models/Board');
const { CREATE_BOARD, GET_BOARD, GET_BOARDS, DELETE_BOARD } = require('../snippets/board');

const getAllBoards = (userId) => {
  return Board.find({ userId })
    .populate('background')
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
  const { title, description, background, userId: adminUserId } = request.body;

  const board = new Board({ title, description, userId: adminUserId || userId, background });

  board.save(async (error, board) => {
    if (error || !board) {
      return response.status(400).json({
        error: CREATE_BOARD.ERROR_MESSAGE,
      });
    }

    const boards = await getAllBoards(adminUserId || userId).then((boards) => boards);

    return response.status(200).json({
      message: CREATE_BOARD.SUCCESSFUL_MESSAGE,
      data: boards.map((board) => ({ id: board._id, ...board._doc })),
    });
  });
};

exports.getBoards = (request, response) => {
  const filter = JSON.parse(request.query.filter);
  const { field, order } = JSON.parse(request.query.sort);

  Board.find(filter)
    .sort({ [field]: order })
    .exec((error, boards) => {
      if (error || !boards) {
        return response.status(500).json({
          error: 'Finding all boards is failed',
        });
      }

      return response.status(200).json({
        data: boards.map((board) => ({ id: board._id, ...board._doc })),
        total: boards.length,
      });
    });
};

exports.getUserBoards = (request, response) => {
  const { userId } = request;

  Board.find({ userId })
    .populate('background')
    .exec((error, boards) => {
      if (error || !boards) {
        return response.status(400).json({
          error: GET_BOARDS.ERROR_MESSAGE,
        });
      }

      return response.status(200).json({
        data: boards,
      });
    });
};

exports.getBoardById = (request, response) => {
  const { id } = request.query;

  Board.findOne({ _id: id })
    .populate('background')
    .exec((error, board) => {
      if (error || !board) {
        return response.status(400).json({
          error: GET_BOARD.ERROR_MESSAGE,
        });
      }

      return response.status(200).json({
        data: board,
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
      data: boards,
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
      data: boards.map((board) => ({ id: board._id, ...board._doc })),
    });
  });
};
