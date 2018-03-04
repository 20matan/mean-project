const mongoose = require('mongoose')

const { Schema } = mongoose

// Create a schema
const mapSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  address: { type: String, required: true },
})

// Create a model from the schema and export it
const map = mongoose.model('map', mapSchema)
module.exports = map
