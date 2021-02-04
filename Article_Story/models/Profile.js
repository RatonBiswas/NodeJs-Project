// User, title, bio , profilePics , Links : {fb, tw, }, posts , bookmarks

const mongoose = require('mongoose')
// const User = require('./User')
// const Post = require('./Post')

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type:String,
        required: true,
        trim:true,
        maxLength:50,
    },
    title:{
        type:String,
        trim: true,
        maxLength:100,
        required: true,
    },
    bio:{
        type:String,
        trim: true,
        required: true,
        maxLength:500,
    },
    profilePic:String,
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String,
    },
    posts:[
        {
            type:mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.ObjectId,
            ref: 'Post'
        }
    ]
    
}, { timestamps: true })

const Profile = mongoose.model('Profile',profileSchema)

module.exports = Profile