const {
  CollectBehavior, CompoundAttackBehavior, MeleeAttackBehavior, RangedAttackBehavior,
} = require('./behavior');
const Cell = require('./Cell');

/**
 * Class representing a production cell.
 * @extends Cell
 */
class ProductionCell extends Cell {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {Player} owner
   * @param {Cell.State} state
   */
  constructor(id, position, owner, state) {
    super(id, position, owner, state);
    this.setAttackBehavior(new CompoundAttackBehavior(this, [
      new MeleeAttackBehavior(this),
      new RangedAttackBehavior(this),
    ]));
    this.setCollectBehavior(new CollectBehavior(this));
  }
}

module.exports = ProductionCell;
