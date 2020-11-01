import Image from '../models/imageModel.js'

export const uploadFile = (req, res) => {
    res.render('upload')
}
export const allFile = (req, res) => {
    Image.find({}).then(images =>{
        res.render('index',{images: images})
    })
}
