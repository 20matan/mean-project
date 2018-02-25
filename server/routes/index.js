// /**
//  * Created by evronor on 09/08/2017.
//  */
//
// var express = require('express'),
//     path = require('path'),
//     router = express.Router();
//
// // Define the routes for all models
// router.use('/Branches', require('./Branches'));
// router.use('/Products', require('./Products'));
// router.use('/Employees', require('./Employees'));
//
// // Redirect to the home page as response to requests on the default route
// router.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/../../index.html'));
// });
//
// // Middleware for errors handling
// router.use(function(err, req, res, next) {
//     console.log(err.stack);
//     res.status(500).send(err.message);
// });
//
// module.exports = router;

const express = require('express')
const fanRouter = require('./fanRouter')
const postRouter = require('./postRouter')
const commentRouter = require('./commentRouter')

const router = express.Router()
router.use('/fan', fanRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)

router.use((err, req, res, next) => {
  console.error('err', err.message)
  res.status(500).send(err.message)
})

module.exports = router
