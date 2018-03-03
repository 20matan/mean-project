const _ = require('lodash')
const Post = require('../models/postModel')

const PostController = {}

PostController.withComments = (req, res, next) => {
  const { id } = req.params
  console.log('post find', id)
  Post.findById(id)
    .populate('comments')
    .populate('hero')
    .then(post => res.send({ success: true, post }))
    .catch(next)
}

PostController.findByIdWithoutRes = id => Post.findById(id)

PostController.findById = (req, res, next) => {
  const { id } = req.params
  console.log('post find', id)
  Post.findById(id)
    .populate('hero')
    .then(post => res.send({ success: true, post }))
    .catch(next)
}

PostController.stats = (req, res, next) => {
  Post.aggregate([
    { $group: { _id: '$hero', count: { $sum: 1 } } },
    {
      $lookup: {
        from: 'heros', localField: '_id', foreignField: '_id', as: 'hero',
      },
    },
    { $unwind: { path: '$hero' } }, // from [] to {}
  ])
    .then((stats) => {
      console.log('a')
      res.send({ success: true, stats })
    })
    .catch(next)
}

PostController.findAll = (req, res, next) => {
  const { role, authorName, hero } = req.query
  const findQuery = {}
  const populationQuery = {}

  if (authorName) {
    findQuery.authorName = authorName
  }
  if (hero) {
    findQuery.hero = hero
  }
  if (role) {
    populationQuery.role = role
  }

  Post.find(findQuery)
    .populate({
      path: 'hero',
      match: populationQuery,
    })
    .then((findRes) => {
      const posts = findRes
        .map(p => Object.assign({}, p.toObject(), { comments: undefined }))
        .filter(p => p.hero)

      res.send({
        success: true,
        posts,
      })
    })
    .catch(next)
}
PostController.create = (req, res, next) => {
  const postData = _.pick(req.body, ['title', 'authorName', 'authorSiteURL', 'date', 'content', 'imageURL', 'videoURL', 'hero'])
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
