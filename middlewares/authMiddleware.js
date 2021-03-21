const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  try {
    if (!request.headers.authorization) {
      return response.status(401).json({
        error: 'Authorization error',
      });
    }
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    request.userId = userId;
    next();
  } catch {
    response.status(401).json({
      error: 'Authorization error',
    });
  }
};
