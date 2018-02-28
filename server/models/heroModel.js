const mongoose = require('mongoose')

const { Schema } = mongoose

// Create a schema
const heroSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  role: { type: String, enum: ['Attack', 'Defender', 'Tank', 'Support'] },
  attackStyle: { type: String, enum: ['Range', 'Meele'] },
  hp: { type: Number },

})

// Create a model from the schema and export it
const hero = mongoose.model('hero', heroSchema)
module.exports = hero
