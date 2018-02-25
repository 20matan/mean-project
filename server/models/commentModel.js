const mongoose = require('mongoose')

const { Schema } = mongoose

// Create a schema
const commentSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  authorSiteURL: { type: String },
  content: { type: String, required: true },
})

// Create a model from the schema and export it
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
