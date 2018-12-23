const CollectBehavior = require('./behavior/CollectBehavior');
const CompoundAttackBehavior = require('./behavior/CompoundAttackBehavior');
const MeleeAttackBehavior = require('./behavior/MeleeAttackBehavior');
const RangedAttackBehavior = require('./behavior/RangedAttackBehavior');
const Cell = require('./Cell');

/**
 * Class representing a production cell.
 * @extends Cell
 */
class ProductionCell extends Cell {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {World} world
   * @param {Player} owner
   * @param {Cell.State} state
   */
  constructor(id, position, world, owner, state) {
    super(id, position, world, owner, state);
    this.setAttackBehavior(new CompoundAttackBehavior(this, [
      new MeleeAttackBehavior(this),
      new RangedAttackBehavior(this),
    ]));
    this.setCollectBehavior(new CollectBehavior(this));
  }
}

module.exports = ProductionCell;
