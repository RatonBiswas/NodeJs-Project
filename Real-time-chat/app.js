const  express = require('express')
const path =require('path')
const chalk = require('chalk')
const  socketio =require('socket.io');
// import * as socketio from 'socket.io-client';
// import {socketio} from "/socket.io/socket.io.js"
const http = require('http')
// import { dirname } from "path";
// import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app)
// const io = socketio(server)
const io = socketio(server)

// Run when client connects
io.on('connection', socket => {
  //** */ Welcome current user
  socket.emit('message','Welcome to ChatBoard')

  // ** Broadcast when a user connects
  socket.broadcast.emit('message','A user has joined the chat')

  // ** Runs when client disconnects
  socket.on('disconnect',()=>{
    io.emit('message','A user has left the chat')
  })
})
// io.on('connect', socket => {
//   console.log("New WS connection.....");
// });

// const __dirname = dirname(fileURLToPath(import.meta.url));
// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//set static folder
app.use(express.static("public"));



// app.get("/", (req, res) => {
//   res.render("index");
// });

const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log(`app running on port ${chalk.greenBright(port)} ....`),
);
