const mongoose = require('mongoose')

const { Schema } = mongoose

// Create a schema
const postSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  authorSiteURL: { type: String },
  date: { type: Date, default: Date.now() },
  content: { type: String, required: true },
  imageURL: { type: String },
  videoURL: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  hero: { type: Schema.Types.ObjectId, ref: 'Hero' },
})

// Create a model from the Post and export it
const Post = mongoose.model('Post', postSchema)
module.exports = Post
