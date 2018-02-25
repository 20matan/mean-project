const mongoose = require('mongoose')

mongoose.Promise = Promise

const dbUrl = 'mongodb://localhost:27017/meancollection'

// Use native ES6 promises
mongoose.Promise = global.Promise

// Connect to the database and export the connection
module.exports = mongoose.connect(dbUrl)
  .then(() => console.log('connected to mongo'))
  .catch((e) => {
    console.error('error in login to mongo', e)
    throw e
  })
