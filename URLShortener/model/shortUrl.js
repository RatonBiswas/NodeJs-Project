import mongoose from 'mongoose'
import shortid from 'shortid'

const shortUrlsSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
        default: ()=> shortid.generate
    },
    clicks:{
        type: String,
        required: true,
        default: 0
    }
})

export default mongoose.model("UrlShortener", shortUrlsSchema);