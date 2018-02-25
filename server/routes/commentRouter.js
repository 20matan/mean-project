const express = require('express')
const commentController = require('../controllers/commentController')

const router = express.Router()

router.get('/', commentController.findAll)
router.post('/', commentController.create)
router.put('/:id', commentController.update)
router.delete('/:id', commentController.delete)

module.exports = router
