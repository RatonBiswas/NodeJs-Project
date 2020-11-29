const  express = require('express')
const path =require('path')
const chalk = require('chalk')
const  socketio =require('socket.io');
// import * as socketio from 'socket.io-client';
// import {socketio} from "/socket.io/socket.io.js"
const http = require('http')
// import { dirname } from "path";
// import { fileURLToPath } from "url";

const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser,getRoomUsers,userLeave} = require('./utils/users')
const app = express();
const server = http.createServer(app)
// const io = socketio(server)
const io = socketio(server)

// Run when client connects
io.on('connection', socket => {

  socket.emit('joinRoom',({username, room})=>{
    const user = userJoin(socket.id,username,room)
    socket.join(user.room)
    //** */ Welcome current user */
    const botName = 'ChatBoard Bot'
    socket.emit('message',formatMessage(botName,'Welcome to ChatBoard!'))
  
    // ** Broadcast when a user connects */
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username}has joined the chat`))
  })

  //** Listen for chatMessage */
  socket.on('chatMessage',(msg)=>{
    // console.log(msg);
    io.emit('message',formatMessage('USER',msg))
  })

  // ** Runs when client disconnects */
  socket.on('disconnect',()=>{
    const user = userLeave(socket.id)
    if(user){
      io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`))
    }
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
