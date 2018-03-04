const _ = require('lodash')
const Map = require('../models/mapModel')

const MapController = {}

MapController.findAll = (req, res, next) => {
  Map.find({})
    .then(maps => res.send({ success: true, maps }))
    .catch(next)
}
MapController.create = async (req, res, next) => {
  const mapData = _.pick(req.body, ['name', 'address'])
  console.log('mapData', mapData, req.body)
  const newMap = Map(mapData)

  try {
    const map = await newMap.save()
    await map.save()
    res.send({ success: true, map })
  } catch (e) {
    next(e)
  }
}
MapController.update = (req, res, next) => {
  console.log('will update ', req.params.id, 'with data', req.body)
  Map.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(map => res.send({ success: true, map }))
    .catch(next)
}
MapController.delete = (req, res, next) => {
  Map.findByIdAndRemove(req.params.id)
    .then(() => res.send({ succes: true }))
    .catch(next)
}

module.exports = MapController
