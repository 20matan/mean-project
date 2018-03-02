const _ = require('lodash')
const Post = require('../models/postModel')

const PostController = {}

PostController.withComments = (req, res, next) => {
  const { id } = req.params
  console.log('post find', id)
  Post.findById(id)
    .populate('comments')
    .then(post => res.send({ success: true, post }))
    .catch(next)
}

PostController.findByIdWithoutRes = id => {
	return Post.findById(id);
};

PostController.findById = (req, res, next) => {
  const { id } = req.params
  console.log('post find', id)
  Post.findById(id)
    .then(post => res.send({ success: true, post }))
    .catch(next)
}

PostController.findAll = (req, res, next) => {
  console.log('post find all')
  Post.find({})
    .then(posts => res.send({
      success: true,
      posts: posts.map(p => Object.assign({}, p.toObject(), { comments: undefined })),
    }))
    .catch(next)
}
PostController.create = (req, res, next) => {
  const postData = _.pick(req.body, ['title', 'authorName', 'authorSiteURL', 'date', 'content', 'imageURL', 'videoURL', 'heroId'])
  console.log('postData', postData, req.body)

  const newPost = Post(postData)
  newPost.save()
    .then(post => res.send({ success: true, post }))
    .catch(next)
}
PostController.update = (req, res, next) => {
  console.log('will update ', req.params.id, 'with data', req.body)
  Post.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(post => res.send({ success: true, post }))
    .catch(next)
}
PostController.delete = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => res.send({ succes: true }))
    .catch(next)
}

PostController.getMore = (req, res, next) => {
  const { postId, heroId } = req.params
  Post.find({})
    .then(posts => res.send({
      success: true,
      posts: posts
        .filter(p => p.toObject().postId !== postId && p.toObject().heroId !== heroId)
        .map(p => Object.assign({}, p.toObject(), { comments: undefined })),
    }))
    .catch(next)
}
module.exports = PostController
