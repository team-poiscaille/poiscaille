const { MoveBehavior } = require('./behavior');
const Cell = require('./Cell');

/**
 * Class representing a producer cell.
 * @extends Cell
 */
class ProducerCell extends Cell {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {Player} owner
   * @param {Cell.State} state
   */
  constructor(id, position, owner, state) {
    super(id, position, owner, state);
    this.setMoveBehavior(new MoveBehavior(this));
  }
}

module.exports = ProducerCell;
