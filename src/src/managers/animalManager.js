const Animal = require('../models/Animal');

exports.create = (ownerId, animalData) => Animal.create({...animalData, owner: ownerId});

exports.getAll = () => Animal.find({}).populate('owner').lean();

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.edit = (animalId, animalinfo) => Animal.findByIdAndUpdate(animalId, animalinfo);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

