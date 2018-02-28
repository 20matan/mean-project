const express = require('express')
// const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
const postController = require('./controllers/postController.js')
require('./dbConnection')
let io = require('socket.io')

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
app.use('/api', routes)

// Serve static files
// app.use('/Content', express.static(path.join(__dirname, '/../Content')))
// app.use('/Scripts', express.static(path.join(__dirname, '/../Scripts')))
// app.use('/app', express.static(path.join(__dirname, '/../app')))

// Start the server and the socket.io
io = io.listen(app.listen(3000, function () {
  console.log('Server running at port %s!', this.address().port)
}))

// Listen to socket.io connection from client
io.sockets.on('connection', (socket) => {
  // waits for post created event
  socket.on('postCreated', (data) => {
    console.log(`${data.poster} posted post id ${data.postId}`)

    // broadcast the new post
    postController.findById(data.postId)
      .then((post) => {
        socket.broadcast.emit('newPost', post)
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

// app.listen(3000, () => {
//   console.log('Run at port 3000')
// })
