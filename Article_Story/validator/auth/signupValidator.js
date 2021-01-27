const User = require("../../models/User");

const { body } = require("express-validator");

module.exports = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username Must be between 2 and 15 characters")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username Already Used");
      }
    })
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Please Provide a valid email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email Already Used");
      }
    })
    .normalizeEmail(),

  body("password")
    .isLength({ min: 5 })
    .withMessage("User password Must be greater than 5 characters"),

  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("User password Must be greater than 5 characters")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password does not match");
      }
      return true;
    }),
];
