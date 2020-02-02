// Module calling
require('babel-register')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

// Page displaying
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })


  function compare( a, b ) {
    if ( a.username < b.username){
      return -1;
    }
    if ( a.username > b.username ){
      return 1;
    }
    return 0;
  }

var usersList = []

// Socket.io computing when connection
io.on('connection', socket => {

    // Message when new user is connected
    socket.on('new user', newUser => {
        //console.log(newUser + ' is online now !')
        io.emit('new user', newUser)
    })

    // Message sending
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })

    // Username changing
    socket.on('username change', data => {
        io.emit('username change', data)
        for (var i in usersList) {
            if (usersList[i].id == data.id) {
               usersList[i].username = data.newUsername;
               break
            }
        }
        usersList.sort(compare)
        io.emit('load list', usersList)
    })

    // New in connected user list
    socket.on('new in list', obj => {
        //console.log(obj)
        usersList.push(obj)
        usersList.sort(compare)
        //console.log(usersList)
        io.emit('load list', usersList)
    })

    socket.on('exit user', obj => {
        //console.log(obj.username + ' is gone')
        io.emit('exit user', obj)
        usersList = usersList.filter(el => el.id != obj.id)
        //console.log(usersList)
        io.emit('load list', usersList)
    })

  })

// Server creating
http.listen(8080, () => {
  console.log('listening on *:8080')
})