// Module calling
require('babel-register')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

// Page displaying
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })

// Socket.io computing when connection
io.on('connection', socket => {

    // Message when new user is connected
    socket.on('new user', newUser => {
        console.log(newUser + ' is online now !')
        io.emit('new user', newUser)
    })

    // Message sending
    socket.on('chat message', msg => {
        io.emit('chat message', msg);    
    })

    // Username changing
    socket.on('username change', data => {
        io.emit('username change', data)
    })
  })

// Server creating
http.listen(8080, () => {
  console.log('listening on *:8080')
})