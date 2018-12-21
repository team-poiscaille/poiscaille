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
   * @param {number} hp
   * @param {number} def
   * @param {number} speed
   */
  constructor(id, position, owner, hp, def, speed) {
    super(id, position, owner, hp, 0, def, speed, Cell.Colors.NONE);
  }
}

module.exports = ProducerCell;
