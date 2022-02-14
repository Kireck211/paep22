const pets = require('../data/pets.json');
const {saveJSON, getJSON} = require('../utils/fileHelpers');

class PetController {
  constructor(saverFunction = saveJSON, getterFunction = getJSON) {
    this.saverFunction = saverFunction;
    this.getterFunction = getterFunction;
  }

  list() {
    return pets;
  }

  getIndex(name) {
    const pets = this.getterFunction();
    return pets.findIndex(pet => pet.name == name);
  }

  get(name) {
    return pets.find(pet => pet.name == name);
  }

  create(pet) {
    const pets = this.getterFunction();
    pets.push(pet);
    this.saverFunction(pets);
    return pet;
  }

  update(name, petProperties) {
    const pets = this.getterFunction();
    const petIndex = this.getIndex(name);
    pets[petIndex] = petProperties;
    this.saverFunction(pets);
    return pets[petIndex];
  }

  delete(name) {
    const pets = this.getterFunction();
    const petIndex = this.getIndex(name);
    const copyPet = {...pets[petIndex]};
    delete pets[petIndex];
    return copyPet;
  }
};

module.exports = PetController;
