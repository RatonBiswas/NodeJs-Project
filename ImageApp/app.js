import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import  dotenv from 'dotenv';
import chalk from 'chalk'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override'

import imageRoute from './routes/imageRoute.js'
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

// use route
app.use('/image',imageRoute)

//** Server running port.
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ...`)
);