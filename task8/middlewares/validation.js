const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const validateRegisterUser = [
  body("username").isLength({ min: 1 }).withMessage("Username is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  body("role")
    .isIn(["admin", "teacher", "student"])
    .withMessage('Role must be either "admin", "teacher", or "student"'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLoginUser = [
  body("username").isLength({ min: 1 }).withMessage("Username is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password is required and must be at least 4 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegisterUser, validateLoginUser };
