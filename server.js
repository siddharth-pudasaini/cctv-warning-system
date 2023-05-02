const express = require('express');
const app = express();
const http = require('http').createServer(app);

// Serve static files from the public directory
app.use(express.static('public'));


const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
    console.log(socket.id)
  
    socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('send-warning', (msg,room) => {
    console.log(`message: ${msg}`);
    socket.broadcast.to(room).emit('receive-warning', msg);
  });

  socket.on('join-room',(room)=>{
    socket.join(room)
    socket.broadcast.to(room).emit('user-joined', socket.id);
  })

});

// Start the server
const PORT = process.env.PORT || 3000;
http.listen(PORT,'0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});