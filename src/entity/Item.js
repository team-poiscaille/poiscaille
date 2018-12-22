const Entity = require('./Entity');

/**
 * Class representing an item.
 * @extends Entity
 */
class Item extends Entity {
  /**
   * @param {number} id
   * @param {Vector2} position
   */
  constructor(id, position) {
    super(id, position);
    this.onCollectedListeners = [];
  }

  /**
   * @callback Item~onCollectedListener
   * @param {Cell} cell
   * @param {Item} item
   */
  /**
   * @param {Item~onCollectedListener} onCollectedListener
   */
  addOnCollectedListner(onCollectedListener) {
    this.onCollectedListners.push(onCollectedListener);
  }

  /**
   * @param {Cell} cell
   */
  collectedBy(cell) {
    this.onCollectedListeners.forEach(onCollectedListener => onCollectedListener(cell, this));
  }

  /** */
  removeAllOnCollectedListners() {
    this.onCollectedListners = [];
  }
}

module.exports = Item;
