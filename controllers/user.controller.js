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
          token: token,
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
