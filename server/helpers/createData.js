const heros = require('./heros.json')
const maps = require('./map.json')

const Hero = require('../models/heroModel')
const Map = require('../models/mapModel')

const functions = {}

functions.populateHeros = () => {
  heros.forEach((hero) => {
    console.log(hero)
    const newHero = Hero(hero)
    newHero.save()
      .catch(console.log)
  })
}

functions.populateMaps = () => {
  maps.forEach((map) => {
    console.log(map)
    const newMap = Map(map)
    newMap.save()
      .catch(console.log)
  })
}

module.exports = functions
