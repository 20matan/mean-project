const mongoose = require('mongoose')

const { Schema } = mongoose

// Create a schema
const fanSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  birthDate: { type: Date, default: Date.now() },
  experience: { type: Number },
})

// Create a model from the schema and export it
const Fan = mongoose.model('Fan', fanSchema)
module.exports = Fan
