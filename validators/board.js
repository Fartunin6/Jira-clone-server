const { check } = require('express-validator');

exports.createBoardValidator = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .isLength({ max: 26 })
    .withMessage('Title must be 26 characters long maximum'),

  check('description')
    .not()
    .isEmpty()
    .withMessage('Description is required')
    .isLength({ max: 100 })
    .withMessage('Description must be 100 characters long maximum'),

  check('backgroundId').not().isEmpty().withMessage('Background is required'),
];
