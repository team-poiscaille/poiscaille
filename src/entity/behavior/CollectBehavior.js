const CellBehavior = require('./CellBehavior');

/**
 * Class representing a collect behavior.
 * @extends CellBehavior
 */
class CollectBehavior extends CellBehavior {
  /**
  * @todo Set min distance (temp = 10)
  * @param {Item} item
  * @returns {boolean}
  */
  canCollect(item) {
    return this.getPerformer().calculateDistance(item) <= 10;
  }

  /**
   * @param {Item} item
   */
  collect(item) {
    item.collectedBy(this.getPerformer());
  }
}

module.exports = CollectBehavior;
