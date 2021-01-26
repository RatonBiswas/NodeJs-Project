const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", { title: "Create A New Account" });
};
exports.signupPostController = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const hashed= await bcrypt.hash(password,11); 
    let user = new User({
      username,
      email,
      password:hashed
    });

    let createdUser = await user.save();
    console.log("Successfully Created Account", createdUser);
    // console.log('Successfully Created Account', user);
    res.render("pages/auth/signup", { title: "Create A New Account" });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
  res.render("pages/auth/login", { title: "Log In Your Account" });
};
exports.loginPostController = (req, res, next) => {};

exports.logoutController = (req, res, next) => {};
