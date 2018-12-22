const Item = require('./Item');

/**
 * Class representing a nutrient.
 * @extends Item
 */
class Nutrient extends Item {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {Item.Information} information
   */
  constructor(id, position, information) {
    super(id, position, information);
    this.addCollectedListener((cell, item) => {
      const owner = cell.getOwner();
      owner.getInventory().addItem(item);
    });
  }
}

module.exports = Nutrient;
