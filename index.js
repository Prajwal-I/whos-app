const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
var current_users = [];

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',(socket)=>{
    //socket.broadcast.emit("user_joined");
    //console.log(socket);
    var usernew = 'lol';

    socket.on('disconnect',()=>{
        current_users.splice(current_users.indexOf(usernew),1);
        io.emit('user-left',{"user":usernew, "user-list":current_users});
        //console.log('user fucked off');
    })

    socket.on('user-join', (user)=>{
        usernew = user;
        current_users.push(user);
        io.emit('new-user',{"user":user,"user-list":current_users});
    })

    socket.on('chat-message', (chat_message)=>{
        // console.log(chat_message.user_name + ' says ');
        // console.log(chat_message.message);
        // console.log('------------------------');

        io.emit('chat-message',chat_message);
    })

})

server.listen(port,()=>{
    console.log('listning on ' + port);
})