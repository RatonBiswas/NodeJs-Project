import express from 'express'
const router = express.Router();
import * as imageController from '../controllers/imageController.js'
// import multer from 'multer'
//Set Images Storage
// let storage = multer.diskStorage({
//     destination: './public/uploads/images/',
//     filename :(req,file,cb) =>{
//         cb(null,file.originalname)
//     }
// })

// let upload = multer({
//     storage : storage,
//     fileFilter : (req, file,cb)=>{
        
//         imageController.checkFileType(file,cb)
//     }
// })

router.get('/upload',imageController.uploadFile);
router.get('/',imageController.allFile);
// router.post('/uploadSingle',upload.single('singleImage'),imageController.uploadSingle);

export default router;