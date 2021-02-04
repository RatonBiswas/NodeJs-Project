const fs= require('fs')
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.uploadProfilePics = async (req, res, next) => {
  if (req.file) {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      let ProfilePics = `/uploads/${req.file.filename}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { ProfilePics } },
        );
      }
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { profilePics } },
      );
      res.status(200).json({
        profilePics
      });
    } catch (e) {
      res.status(500).json({
        profilePics: req.user.profilePics
      })
    }
  }else {
    res.status(500).json({
        profilePics: req.user.profilePics
      })
  }
};

exports.removeProfilePics =async (req, res, next) => {
  try {
    let defaultProfile = 'upload/default.png'
    let currentProfile = req.user.profilePics
    let profile =  await Profile.findOne({user: req.user._id})
    if(profile){
      await Profile.findOneAndUpdate(
        {user: req.user._id},
        {$set: { profilePics: defaultProfile}}
      )
    }
    User.findOneAndUpdate(
      { _id : req.user._id},
      { $set: { profilePics:defaultProfile}}
    )
    fs.unlink(`public${currentProfile}`)
      
    res.status(200).json({
      profilePics: defaultProfile
    })
  } catch (e) {
    res.status(500).json({
      message: 'Can not remove profile pricture'
    })
  }
}