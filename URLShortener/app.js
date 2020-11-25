import express from 'express'
import path from 'path'
import chalk from 'chalk';
import  dotenv from 'dotenv';
import mongoose from 'mongoose'
import shortUrl from './model/shortUrl.js'

const app = express();
import { dirname } from 'path';
import { fileURLToPath } from 'url';

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

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false}));

// app.use(express.static('public'));

app.use(express.json()); 

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/shortUrls',async(req,res) => {
    await shortUrl.create({full: req.body.fullurl})
    res.redirect('/')
})

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ....`)
);