const express = require('express')
const fanController = require('../controllers/fanController')

const router = express.Router()

router.get('/', fanController.findAll)
router.post('/', fanController.create)
router.put('/:id', fanController.update)
router.delete('/:id', fanController.delete)

module.exports = router
