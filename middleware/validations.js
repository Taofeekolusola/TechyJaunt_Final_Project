const {body,  query, validationResult } = require("express-validator");

const validateProperty = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string."),
  body("description")
    .notEmpty()
    .withMessage("Description is required.")
    .isString()
    .withMessage("Description must be a string.")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long."),
  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number."),
  body("location")
    .notEmpty()
    .withMessage("Location is required.")
    .isString()
    .withMessage("Location must be a string."),
  body("contactDetails")
    .notEmpty()
    .withMessage("Contact details are required.")
    .matches(
      /^[\w\.-]+@[\w\.-]+\.\w{2,}|^(\+\d{1,3}[- ]?)?\d{10}$/
    )
    .withMessage("Contact details must be a valid email or phone number."),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


const validateSearch = [
  query("minPrice").optional().isNumeric().withMessage("Min price must be a number"),
  query("maxPrice").optional().isNumeric().withMessage("Max price must be a number"),
  query("location").optional().isString().withMessage("Location must be a string"),
  query("limit").optional().isInt({ gt: 0 }).withMessage("Limit must be a positive integer"),
  query("offset").optional().isInt({ min: 0 }).withMessage("Offset must be a non-negative integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
    validateSearch,
    validateProperty,
};