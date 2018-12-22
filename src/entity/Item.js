const Entity = require('./Entity');

/**
 * Class representing an item.
 * @extends Entity
 */
class Item extends Entity {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {Item.Information} information
   */
  constructor(id, position, information) {
    super(id, position);
    this.information = information;
  }

  /**
   * @callback Item~onCollected
   * @param {Cell} cell
   * @param {Item} item
   */
  /**
   * @param {Item~onCollected} onCollected
   */
  addCollectedListener(onCollected) {
    this.addListener('collected', onCollected);
  }

  /**
   * @param {Cell} cell
   */
  collectedBy(cell) {
    this.emit('collected', cell, this);
  }

  /**
   * @returns {Item.Information}
   */
  getInformation() {
    return this.information;
  }

  /** */
  removeAllCollectedListeners() {
    this.removeAllListeners('collected');
  }

  /**
   * @param {Item.Information} information
   */
  setInformation(information) {
    this.information = information;
  }
}

/**
 * Class representing item information.
 * @memberof Item
 */
class Information {

}

Item.Information = Information;

module.exports = Item;
