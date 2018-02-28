const express = require('express')
// const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
require('./dbConnection')
// const branchesController = require('./controllers/Branches.js')
// let io = require('socket.io')
const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log('request ', req.method, req.originalUrl, req.body)

  next()
})


// Add support for parsing of application/json type post data

// Enable CORS Requests
app.use(cors())

// Define all routes
app.use('/api',routes);

// Serve static files
// app.use('/Content', express.static(path.join(__dirname, '/../Content')))
// app.use('/Scripts', express.static(path.join(__dirname, '/../Scripts')))
// app.use('/app', express.static(path.join(__dirname, '/../app')))

// Start the server and the socket.io
// io = io.listen(app.listen(3000, function () {
//   console.log('Server running at port %s!', this.address().port)
// }))

// Listen to socket.io connection from client
// io.sockets.on('connection', (socket) => {
//   // Listen to an emit of 'branchCreated' event from client
//   socket.on('branchCreated', (data) => {
//     console.log(data.message + data.name)
//
//     // Get promise with the updated branches list and broadcast
//     // emit 'refreshBranches' event to all other clients
//     branchesController.refreshBranches()
//       .then((branches) => {
//         socket.broadcast.emit('refreshBranches', branches)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   })
// })

app.listen(3000, () => {
  console.log('Run at port 3000')
})
