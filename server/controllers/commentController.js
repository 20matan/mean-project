const _ = require('lodash')
const Comment = require('../models/commentModel')
const Post = require('../models/postModel')

const CommentController = {}

CommentController.findAll = (req, res, next) => {
  console.log('post find all')
  Comment.find({})
    .then(comments => res.send({ success: true, comments }))
    .catch(next)
}
CommentController.create = async (req, res, next) => {
  const commentData = _.pick(req.body, ['title', 'authorName', 'authorSiteURL', 'content'])
  console.log('postData', commentData, req.body)
  const { postId } = req.body

  const withPost = Object.assign({}, commentData)
  const newComment = Comment(withPost)

  try {
    const comment = await newComment.save()
    const post = await Post.findById(postId)
    post.comments.push(comment)
    await post.save()
    res.send({ success: true, comment })
  } catch (e) {
    next(e)
  }
}
CommentController.update = (req, res, next) => {
  console.log('will update ', req.params.id, 'with data', req.body)
  Comment.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(post => res.send({ success: true, post }))
    .catch(next)
}
CommentController.delete = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(() => res.send({ succes: true }))
    .catch(next)
}

module.exports = CommentController
