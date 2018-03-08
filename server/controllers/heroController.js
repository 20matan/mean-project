const _ = require("lodash");
const Hero = require("../models/heroModel");

const HeroController = {};

HeroController.findAll = (req, res, next) => {
  console.log("Hero find all");
  const { query = {} } = req;
  Hero.find(query)
    .then(Heros => res.send({ success: true, Heros }))
    .catch(next);
};
HeroController.create = (req, res, next) => {
  const HeroData = _.pick(req.body, [
    "firstName",
    "lastName",
    "gender",
    "birthDate",
    "experience"
  ]);
  console.log("HeroData", HeroData, req.body);

  const newHero = Hero(HeroData);
  newHero
    .save()
    .then(hero => res.send({ success: true, hero }))
    .catch(next);
};
HeroController.update = (req, res, next) => {
  console.log("will update ", req.params.id, "with data", req.body);
  Hero.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  })
    .then(hero => res.send({ success: true, hero }))
    .catch(next);
};
HeroController.delete = (req, res, next) => {
  Hero.findByIdAndRemove(req.params.id)
    .then(() => res.send({ succes: true }))
    .catch(next);
};

HeroController.findByRole = (req, res, next) => {
  const { role } = req.params;
  Hero.find({ role })
    .then(heros => res.send({ succes: true, heros }))
    .catch(next);
};

module.exports = HeroController;
