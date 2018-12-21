const Entity = require('./Entity');

class Item extends Entity {
  /**
   * @param {number} id
   * @param {number} x
   * @param {number} y
   */
  constructor(id, x, y) {
    super('item', id, x, y);
    this.onCollectedListner = null;
  }

  /**
   * @param {Cell} cell
   */
  collectedBy(cell) {
    const { onCollectedListner } = this;
    if (typeof onCollectedListner === 'function') {
      onCollectedListner.onCollected(cell);
    }
  }

  /**
   * @param {OnCollectedListener} onCollectedListner
   */
  setOnCollectedListner(onCollectedListner) {
    this.onCollectedListner = onCollectedListner;
  }
}

module.exports = Item;
