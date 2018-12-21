const Entity = require('./Entity');

class Item extends Entity {
  /**
   * @param {number} id
   * @param {Vector2} pos
   * @param {Player} owner
   */
  constructor(id, pos, owner) {
    super('item', id, pos, owner);

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
