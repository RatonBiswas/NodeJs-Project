import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    imgUrl: String,
})

export default mongoose.model("Image", imageSchema);
