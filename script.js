var socket = io();

var user_name;
function login(){
    user_name = document.getElementById("user_name").value;
    console.log(user_name);
    if(user_name!==undefined && user_name!==""){
        document.getElementById("login_form").style.display = "none";
        document.getElementById("content").style.display = "";
        document.getElementById('username_local').innerText = user_name;
        socket.emit('user-join',user_name);
        return;
    }
    return(alert("enter a name mf"));
}

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(input.value) {
        socket.emit('chat-message', {"user_name":user_name, "message":input.value})
        input.value = "";
    }
})

socket.on('chat-message', (chat_message)=>{
    var item = document.createElement('li');
    item.innerHTML = "<strong>"+chat_message.user_name+"</strong>"+" "+chat_message.message;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
})

socket.on('new-user',(newuser)=>{
    console.log(newuser);
    var item = document.createElement('li');
    item.innerHTML = "<strong>"+newuser.user+" has joined the room.</strong>"
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
})

socket.on('user-left',(leftuser)=>{
    console.log(leftuser);
    var item = document.createElement('li');
    item.innerHTML = "<strong>"+leftuser.user+" has left the room.</strong>"
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
})