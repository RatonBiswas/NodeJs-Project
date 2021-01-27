const User = require("../../models/User");

const { body } = require("express-validator");

module.exports = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email Can't Be Empty")
    .isEmail()
    .withMessage("Invalid credential")
    // .custom(async (email) => {
    //   let user = await User.findOne({ email });
    //   if (!user) {
    //     return Promise.reject("Invalid credential");
    //   }
    // })
    .normalizeEmail(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Password Can't Be Empty")
    
];
