const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const path = require('path');

server.listen(3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// See https://socket.io/docs/#Using-with-Express
io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
