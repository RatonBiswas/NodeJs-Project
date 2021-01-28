const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Create A New Account",
    error: {},
    value: "",
  });
};

exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/signup", {
      title: "Create A New Account",
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
    });
  }
  try {
    const hashed = await bcrypt.hash(password, 11);
    let user = new User({
      username,
      email,
      password: hashed,
    });

    let createdUser = await user.save();
    console.log("Successfully Created Account");
    // console.log('Successfully Created Account', user);
    res.render("pages/auth/signup", {
      title: "Create A New Account",
      error: {},
      value: "",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn,req.session.user);
  // let isLoggedIn =  req.get('Cookie').includes('isLoggedIn=true') ? true : false;
  //res.render("pages/auth/login", { title: "Log In Your Account" , error: {}  , isLoggedIn:false});
    res.render("pages/auth/login", { title: "Login Your Account", error: {} });
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;
  // let isLoggedIn =  req.get('Cookie').includes('isLoggedIn=true') ? true : false;
  //res.render("pages/auth/login", { title: "Log In Your Account" , error: {} , value:'' , isLoggedIn:false});
  
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/login", {
      title: "Login your Account",
      error: errors.mapped()
    });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid credential",
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Invalid credential",
      });
    }
    req.session.isLoggedIn=true
    req.session.user=user
    req.session.save(err => {
      if(err) {
        console.log(err)
        return next(err)
      }
      res.redirect("/dashboard")
    })
    
  } catch (e) {
    console.log(e)
    next(e);
  }
}

exports.logoutController = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      console.log(err)
      return next(err)
    }
    return res.redirect("/auth/login")
  })
}
