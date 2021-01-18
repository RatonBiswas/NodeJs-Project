// title , body , author ,tags, thumnail , readtime , likes, dislikes, comments
const mongoose = require('mongoose')
const User = require('./User')
const Comment = require('./Comment')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        maxLength:100,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    tags:{
        type:[String],
        required:true
    },
    thumnail: String,
    readTime: String,
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: User,
    }],
    dislikes: [{
        type: mongoose.Schema.ObjectId,
        ref: User,
    }],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: Comment
        }
    ]
},{
    timestamp:true
})


const Post = mongoose.model('Post',postSchema)

module.exports = Post