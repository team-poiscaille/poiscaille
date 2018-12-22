const Entity = require('./Entity');

/**
 * Class representing an item.
 * @extends Entity
 */
class Item extends Entity {
  /**
   * @callback Item~onCollected
   * @param {Cell} cell
   * @param {Item} item
   */
  /**
   * @param {Item~onCollected} onCollected
   */
  addCollectedListner(onCollected) {
    this.addListener('collected', onCollected);
  }

  /**
   * @param {Cell} cell
   */
  collectedBy(cell) {
    this.emit('collected', cell, this);
  }

  /** */
  removeAllCollectedListners() {
    this.removeAllListeners('collected');
  }
}

module.exports = Item;
