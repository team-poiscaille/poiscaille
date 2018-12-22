const Item = require('./Item');

/**
 * Class representing a DNA.
 * @extends Item
 */
class Dna extends Item {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {Dna.Information} information
   */
  constructor(id, position, information) {
    super(id, position);
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

}

Dna.Information = Information;

module.exports = Dna;
