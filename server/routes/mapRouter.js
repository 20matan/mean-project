const express = require('express')
const mapController = require('../controllers/mapController')

const router = express.Router()

router.get('/', mapController.findAll)
router.post('/', mapController.create)
router.put('/:id', mapController.update)
router.delete('/:id', mapController.delete)

module.exports = router
