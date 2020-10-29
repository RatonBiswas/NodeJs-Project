import express from 'express'
import path from 'path'
import chalk from 'chalk';
import  dotenv from 'dotenv';
import methodOverride from 'method-override'
import  mongoose from 'mongoose';
const app = express();
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import employeesRoute from './routes/employeesRoute.js'

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
app.use(express.static('public'));

app.use(express.json()); 
// Body parser Middleware
app.use(bodyParser.urlencoded({ extended:true}));

//middleware method override
app.use(methodOverride('_method'))

// Use Routes

app.use('/employee', employeesRoute) 


const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ....`)
);