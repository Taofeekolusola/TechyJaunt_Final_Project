const { body, validationResult } = require('express-validator');

const validateProperty = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required'),
  body('contact')
    .notEmpty()
    .withMessage('Contact is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  body('userId')
    .isInt()
    .withMessage('User ID must be a valid number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateProperty };
