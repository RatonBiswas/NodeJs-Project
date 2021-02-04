const {validationResult} = require('express-validator')
const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");
const errorFormatter = require('../utils/validationErrorFormatter')

exports.dashboardGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.render("pages/dashboard/dashboard", {
        title: "My Dashboard",
        flashMessage: Flash.getMessage(req),
      });
    }
    res.redirect('/dashboard/create-profile');
  } catch (err) {
    next(err);
  }
};

exports.createProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-profile");
    }
    res.render("pages/dashboard/create-profile", {
      title: "Create Your Profile",
      flashMessage: Flash.getMessage(req),
      error:{}
    });
  } catch (err) {
    next(err);
  }
};

exports.createProfilePostController = async (req, res, next) => {
  let errors = validationResult(req).formatWith(errorFormatter)
  if(!errors.isEmpty()){
    return res.render("pages/dashboard/create-profile", {
      title: "Create Your Profile",
      flashMessage: Flash.getMessage(req),
      error: errors.mapped()
    });
  }
  res.render("pages/dashboard/create-profile", {
    title: "Create Your Profile",
    flashMessage: Flash.getMessage(req),
    error:{}
  });

}

exports.editProfileGetController = async (req, res, next) => {
    
}

exports.editProfilePostController = async (req, res, next) => {
    
}