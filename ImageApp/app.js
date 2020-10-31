import express from 'express'
import mongoose from 'mongoose'
import chalk from 'chalk'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));

//**  view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//** Server running port.
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ....`)
);