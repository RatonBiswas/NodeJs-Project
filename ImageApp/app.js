import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import  dotenv from 'dotenv';
import chalk from 'chalk'
import multer from 'multer'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'

import imageRoute from './routes/imageRoute.js'
import Image from './models/imageModel.js'
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: './config.env' });

// connecting to mongoDB database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connection ${chalk.greenBright('successful!')}`))
  .catch(err => console.log(chalk.redBright(err)));


//**  view engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json()); 

// override middleware
app.use(methodOverride('_method'))
//Set Images Storage
let storage = multer.diskStorage({
    destination: './public/uploads/images/',
    filename :(req,file,cb) =>{
        cb(null,file.originalname)
    }
})

let upload = multer({
    storage : storage,
    fileFilter : (req, file,cb)=>{
        checkFileType(file,cb)
    }
})

// use route
app.use('/image',imageRoute)
app.post('/uploadSingle',upload.single('singleImage'),(req,res,next) =>{
    const file = req.file
    if(!file){
        return console.log("Please select an image");
    }

    let url = file.path.replace('public', '');
    Image.findOne({imaUrl: url}).then(img=>{
        if(img){

            console.log("Duplicte Image,Please Try Again!");
            return res.redirect('/upload')
        }
        Image.create({imgUrl: url}).then(images=>{
            console.log("Image Save to Database");
            res.redirect('/image/')
        })
    }).catch(err =>{
        return console.log('Error: '+err);
    })
})

app.post('/uploadmultiple',upload.array('multipleImage'),(req,res,next)=>{
    const files = req.files
    if(!files){
        return console.log('Please select image');
    }
    
    files.forEach(file => {
        let url = file.path.replace('public','')
        Image.findOne({image: url}).then(async img=>{
            if(img){

                return console.log('Duplicate image')
            }
            await Image.create({imgUrl: url})
        }).catch(err =>{
            return console.log('Error: '+err)
        })
    })
    res.redirect('/image/')
})



function checkFileType(file,cb){
    const fileTypes = /jpeg|jpg|gif|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    if(extname){
        return cb(null,true)
    }else{
        cb('Error : Please Image Only.')
    }
}

//** Server running port.
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ...`)
);