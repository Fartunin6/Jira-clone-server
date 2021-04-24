const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { USER } = require('../snippets/user');

exports.getMe = (request, response) => {
  const { token } = request.query;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          error: USER.EXPIRED_ERROR_MESSAGE,
        });
      }

      const { _id } = decoded;

      User.findOne({ _id }).exec((err, user) => {
        if (err || !user) {
          return response.status(404).json({
            error: USER.USER_ERROR_MESSAGE,
          });
        }

        const { _id, name, email } = user;
        return response.status(200).json({
          token,
          user: { _id, name, email },
        });
      });
    });
  } else {
    return response.status(401).json({
      error: USER.UNEXPECTED_ERROR_MESSAGE,
    });
  }
};

exports.getUsersByIds = (request, response) => {
  const { ids } = JSON.parse(request.query.filter);

  User.find()
    .where('_id')
    .in(ids)
    .exec((error, users) => {
      if (error || !users) {
        return response.status(400).json({
          error: 'Finding user by id is failed',
        });
      }

      return response.status(200).json({
        data: users.map((user) => ({ id: user._id, ...user._doc })),
      });
    });
};

exports.getAllUsers = (request, response) => {
  User.find().exec((error, users) => {
    if (error || !users) {
      return response.status(500).json({
        error: 'Finding all users is failed',
      });
    }

    return response.status(200).json({
      data: users.map((user) => ({
        name: user.name,
        email: user.email,
        id: user._id,
      })),
      total: users.length,
    });
  });
};

exports.deleteUserById = (request, response) => {
  const { id } = request.query;

  User.deleteOne({ _id: id }).exec(async (error, user) => {
    if (error) {
      return response.status(400).json({
        error: DELETE_BOARD.ERROR_MESSAGE,
      });
    }

    return response.status(200).json({
      data: user,
    });
  });
};
