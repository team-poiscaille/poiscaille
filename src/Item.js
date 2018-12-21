const Entity = require('./Entity');

class Item extends Entity {
  /**
   * @param {number} id
   * @param {number} x
   * @param {number} y
   */
  constructor(id, x, y) {
    super('item', id, x, y);
  }

  /**
   * @param {Cell} cell
   */
  collectedBy(cell) {
    const { onCollected } = this;
    if (typeof onCollected === 'function') {
      onCollected(cell);
    }
  }

  /**
   * @param {Function} onCollected
   */
  setOnCollectedListner(onCollected) {
    this.onCollected = onCollected;
  }
}

module.exports = Item;
