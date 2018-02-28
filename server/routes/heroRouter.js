const express = require('express')
const heroController = require('../controllers/heroController')

const router = express.Router()

router.get('/', heroController.findAll)
router.post('/', heroController.create)
router.put('/:id', heroController.update)
router.delete('/:id', heroController.delete)

module.exports = router
