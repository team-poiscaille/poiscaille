const Item = require('./Item');

/**
 * Class representing a nutrient.
 * @extends Item
 */
class Nutrient extends Item {
  type = 'Nutrient';

  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {World} world
   * @param {number} amount
   */
  constructor(id, position, world, amount) {
    super(id, position, world);
    this.amount = amount;
    this.addCollectedListener((cell, item) => {
      const owner = cell.getOwner();
      owner.addNutrients(item.getAmount());
    });
  }

  /**
   * @returns {number}
   */
  getAmount() {
    return this.amount;
  }

  /**
   * @param {number} amount
   */
  setAmount(amount) {
    this.amount = amount;
  }
}

module.exports = Nutrient;
