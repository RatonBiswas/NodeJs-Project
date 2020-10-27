
const express = require('express');
const chalk = require('chalk')
const path = require('path')
const searchRoute = require('./router/searchRoute')



const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');



app.use(express.static(`${__dirname}/public`));

app.use(express.static('public'))

app.use(express.json());

app.use('',searchRoute)



const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ....`)
);

exports.module=app