require('babel-register')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  })

io.on('connection', (socket) => {
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);    
    })
  })

http.listen(8080, function(){
  console.log('listening on *:8080')
})