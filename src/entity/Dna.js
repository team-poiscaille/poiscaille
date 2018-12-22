const Item = require('./Item');

/**
 * Class representing a DNA.
 * @extends Item
 */
class Dna extends Item {
  /**
   * @param {number} id
   * @param {Vector2} position
   */
  constructor(id, position) {
    super(id, position);
    this.addOnCollectedListner((cell, item) => {
      const owner = cell.getOwner();
      owner.getInventory().addItem(item);
    });
  }
}

module.exports = Dna;
