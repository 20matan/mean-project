const Hero = require('./models/heroModel')
const Map = require('./models/mapModel')
const populate = require('./helpers/createData')
const mongoose = require('mongoose')

mongoose.Promise = Promise

const dbUrl = 'mongodb://localhost:27017/meancollection'

// Use native ES6 promises
mongoose.Promise = global.Promise

// Connect to the database and export the connection
module.exports = mongoose.connect(dbUrl)
  .then(() => {
    console.log('connected to mongo')
    Hero.find({})
      .then((heros) => {
        if (heros.length === 0) {
          populate.populateHeros()
        }
      })
      .catch(console.log)
    Map.find({})
      .then((maps) => {
        if (maps.length === 0) {
          populate.populateMaps()
        }
      })
      .catch(console.log)
  })
  .catch((e) => {
    console.error('error in login to mongo', e)
    throw e
  })
