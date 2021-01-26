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
    console.log("Successfully Created Account");
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
exports.loginPostController = async(req, res, next) => {
    let {email, password} = req.body
    try{
        let user = await User.findOne({ email})
        if(!user) {
            return res.json({
                message: "Invalid credential"
            })
        }


        let match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.json({
                message: "Invalid credential"
            })
        }
        console.log("Login successful");
        res.render("pages/auth/login", { title: "Log In Your Account" });
    }catch(e){
        console.log(e);
        next(e)
    }
};

exports.logoutController = (req, res, next) => {};
