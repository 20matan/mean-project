const express = require('express')
// const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
const {findByIdWithoutRes} = require('./controllers/postController.js')
require('./dbConnection')

const app = express()
app.use(bodyParser.json())

var http = require('http').Server(app);
var io = require('socket.io')(http);

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





io.on('connection', function (socket) {
	console.log('user connected');
	socket.on('postCreated', (data) => {    
		// broadcast the new post
		findByIdWithoutRes(data.postId)
		  .then((post) => {
			socket.broadcast.emit('postCreated', data)
		  })
		  .catch((err) => {
			console.log(err)
		  });
	});
	
});

// Start the server
http.listen(3000, function() {
	console.log('listening on port 3000');
});

// Listen to socket.io connection from client
/*io.sockets.on('connection', (socket) => {
  // waits for post created event
  socket.on('postCreated', (data) => {
    

    // broadcast the new post
    postController.findById(data.postId)
      .then((post) => {
        socket.broadcast.emit('newPost', post)
      })
      .catch((err) => {
        console.log(err)
      })
  })
})*/

// app.listen(3000, () => {
//   console.log('Run at port 3000')
// })
