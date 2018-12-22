const Item = require('./Item');

/**
 * Class representing a nutrient.
 * @extends Item
 */
class Nutrient extends Item {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {number} amount
   */
  constructor(id, position, amount) {
    super(id, position);
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
