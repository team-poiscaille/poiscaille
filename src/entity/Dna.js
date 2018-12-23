const Item = require('./Item');

/**
 * Class representing a DNA.
 * @extends Item
 */
class Dna extends Item {
  type = 'DNA';

  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {World} world
   * @param {Dna.Information} information
   */
  constructor(id, position, world, information) {
    super(id, position, world);
    this.information = information;
    this.addCollectedListener((cell, item) => {
      const owner = cell.getOwner();
      owner.addDna(item);
    });
  }

  /**
   * @returns {Dna.Information}
   */
  getInformation() {
    return this.information;
  }

  /**
   * @param {Dna.Information} information
   */
  setInformation(information) {
    this.information = information;
  }
}

/**
 * Class representing DNA information.
 * @memberof Dna
 */
class Information {
  /**
   * Parses and creates Dna.Information
   * @param data
   * @returns {Dna.Information}
   */
  static parse(data) {
    // TODO implement DNA information
    return new Dna.Information();
  }
}

Dna.Information = Information;

module.exports = Dna;
