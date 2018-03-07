const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
const { findByIdWithoutRes } = require('./controllers/postController.js')
require('./dbConnection')

const app = express()
app.use(bodyParser.json())

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use((req, res, next) => {
  console.log('request ', req.method, req.originalUrl, req.body)

  next()
})

app.use(cors())

// Define all routes
app.use('/api', routes)

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
