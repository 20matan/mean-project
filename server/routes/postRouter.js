const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

router.get('/', postController.findAll)
router.post('/', postController.create)
router.get('/:id', postController.withComments)
router.put('/:id', postController.update)
router.delete('/:id', postController.delete)

module.exports = router
