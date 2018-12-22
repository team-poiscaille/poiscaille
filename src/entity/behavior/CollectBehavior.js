const CellBehavior = require('./CellBehavior');

/**
 * Class representing a collecting behavior.
 * @extends CellBehavior
 */
class CollectBehavior extends CellBehavior {
  /**
  * @param {Item} item
  * @returns {boolean}
  */
  canCollect(item) {
    const performer = this.getPerformer();
    return performer.calculateDistance(item) <= performer.getState().collectableDistance;
  }

  /**
   * @param {Item} item
   */
  collect(item) {
    if (this.canCollect(item)) {
      item.collectedBy(this.getPerformer());
    }
  }
}

module.exports = CollectBehavior;
