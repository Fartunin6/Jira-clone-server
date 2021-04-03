const jwt = require('jsonwebtoken');
const { apiInstance, sendSmtpEmail } = require('../configs/emailClient');

// import models
const User = require('../models/User');

// import templates
const { accountActivation } = require('../templates/accountActivation');

// import snippsets
const { SIGN_UP, ACCOUNT_ACTIVATION, SIGN_IN } = require('../snippets/auth');

exports.signup = (request, response) => {
  const { name, email, password } = request.body;

  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return response.status(409).json({
        error: SIGN_UP.ERROR_MESSAGE,
      });
    }

    const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '10m',
    });

    sendSmtpEmail.to = [{ name, email }];
    sendSmtpEmail.sender = { name: 'Andrey Rafalskyi', email: process.env.EMAIL_FROM };
    sendSmtpEmail.subject = 'Account activation link';
    sendSmtpEmail.htmlContent = accountActivation(token);

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      (data) => {
        return response.status(200).json({
          message: SIGN_UP.SUCCESSFUL_MESSAGE(email),
        });
      },
      (error) => {
        console.error(error);
        return response.status(error.status).json({
          error: error.message,
        });
      },
    );
  });
};

exports.accountActivation = (request, response) => {
  const { token } = request.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          error: ACCOUNT_ACTIVATION.LINK_ERROR_MESSAGE,
        });
      }

      const { name, email, password } = jwt.decode(token);

      const user = new User({ name, email, password });

      user.save((error, user) => {
        if (error) {
          return response.status(500).json({
            error: ACCOUNT_ACTIVATION.SAVE_ERROR_MESSAGE,
          });
        }
        return response.status(201).json({
          message: ACCOUNT_ACTIVATION.SUCCESSFUL_MESSAGE,
        });
      });
    });
  } else {
    return response.status(500).json({
      message: ACCOUNT_ACTIVATION.UNEXPECTED_ERROR_MESSAGE,
    });
  }
};

exports.signin = (request, response) => {
  const { email, password } = request.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return response.status(400).json({
        error: SIGN_IN.USER_ERROR_MESSAGE,
      });
    }

    if (!user.authenticate(password)) {
      return response.status(400).json({
        error: SIGN_IN.PASSWORD_ERROR_MESSAGE,
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { _id, name, email } = user;
    return response.status(200).json({
      token,
      user: { _id, name, email },
    });
  });
};
