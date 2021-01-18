// title , body , author ,tags, thumnail , readtime , likes, dislikes, comments
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        maxLength:100,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    tags:{
        type:[String],
        required:true
    },
    thumnail: String,
    readTime: String,
    likes: [mongoose.Schema.ObjectId],
    dislikes: [mongoose.Schema.ObjectId],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment',
        }
    ]
},{
    timestamp:true
})


const Post = mongoose.model('Post',postSchema)

module.exports = Post