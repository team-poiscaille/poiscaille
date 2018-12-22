const { ProduceBehavior } = require('./behavior');
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
    this.produceBehavior = new ProduceBehavior(this);
  }

  /**
   * @param {number} amount
   */
  performProduce(amount) {
    const { produceBehavior } = this;
    if (produceBehavior) {
      produceBehavior.produce(amount);
    }
  }

  /**
   * @param {ProduceBehavior} produceBehavior
   */
  setProduceBehavior(produceBehavior) {
    this.produceBehavior = produceBehavior;
  }
}

module.exports = ProducerCell;
