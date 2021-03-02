exports.SIGN_UP = {
  ERROR_MESSAGE: 'User with such email is already exists',
  SUCCESSFUL_MESSAGE: (email) =>
    `Email with activation link is sent to ${email}. Follow the instructions`,
};

exports.ACCOUNT_ACTIVATION = {
  LINK_ERROR_MESSAGE: 'Expired link. Sign up again',
  SAVE_ERROR_MESSAGE: 'Error saving user in database. Try signup again',
  UNEXPECTED_ERROR_MESSAGE: 'Something went wrong. Try again',
  SUCCESSFUL_MESSAGE: 'User is saved successfully',
};

exports.SIGN_IN = {
  USER_ERROR_MESSAGE: 'User with that email does not exist',
  PASSWORD_ERROR_MESSAGE: 'Email and password do not match',
};
