const Entity = require('./Entity');

class Item extends Entity {
  /**
   * @param {number} id
   * @param {number} x
   * @param {number} y
   */
  constructor(id, x, y) {
    super('item', id, x, y);
    this.onCollectedListener = null;
  }

  /**
   * @param {Cell} cell
   */
  collectedBy(cell) {
    const { onCollectedListener } = this;
    if (typeof onCollectedListener === 'function') {
      onCollectedListener.onCollected(cell);
    }
  }

  /**
   * @param {OnCollectedListener} onCollectedListener
   */
  setOnCollectedListner(onCollectedListener) {
    this.onCollectedListner = onCollectedListener;
  }
}

module.exports = Item;
