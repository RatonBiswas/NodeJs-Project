// post  , user , body , replies

const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    body:{
        type: String,
        trim: true,
        required: true
    },
    replies:[
        {
            body:{
                type:String,
                required:true,
            },
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            createdAt:{
                type:Date,
                default : new Date()
            }
        }
    ]
},{
    timestamp:true
})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment