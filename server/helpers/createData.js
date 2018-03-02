const heros = require('./heros.json')

const Hero = require('../models/heroModel')

const functions = {}

functions.populateHeros = () => {
  heros.forEach((hero) => {
      console.log(hero)
    const newHero = Hero(hero)
    newHero.save()
      .catch(console.log)
  })
}

module.exports = functions
