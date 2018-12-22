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
    super(id, position, information);
    this.addCollectedListener((cell, item) => {
      const owner = cell.getOwner();
      owner.getInventory().addItem(item);
    });
  }
}

/**
 * Class representing DNA information.
 * @memberof Dna
 */
class Information extends Item.Information {

}

Dna.Information = Information;

module.exports = Dna;
