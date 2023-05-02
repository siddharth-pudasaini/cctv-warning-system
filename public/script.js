const socket = io.connect();
const audio=new Audio('siren.mp3')
let room

      // Send a chat message
      function sendMessage() {
        const message = document.getElementById('message').value;
        socket.emit('send-warning', message,room);
        const li = document.createElement('li');
        li.textContent = message;
        document.getElementById('messages').appendChild(li);
        document.getElementById('message').value = '';
      }

      function joinRoom(){
        room=document.getElementById('room').value;
        document.getElementById('room').value = '';
        socket.emit('join-room',room)
        const roomInfo=document.getElementById('roomInfo')
        roomInfo.innerText=`Room joined: ${room}`
      }

      // Receive a chat message
      socket.on('receive-warning', (msg) => {
        const li = document.createElement('li');
        li.textContent = msg;
        audio.play();
        audio.play();
        document.getElementById('messages').appendChild(li);
      });

      socket.on('user-joined',(user)=>{
        const li = document.createElement('li');
        li.textContent = `${user} joined the room`;
        document.getElementById('messages').appendChild(li);
      })


      socket.on('connect',()=>{
            console.log(socket.id)
    })