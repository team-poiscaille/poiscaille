const ProduceBehavior = require('./behavior/ProduceBehavior');
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
   * @param {Array.<DnaInformation>} dnaList
   */
  constructor(id, position, owner, state, dnaList) {
    super(id, position, owner, state);
    this.dnaList = dnaList;
    this.produceBehavior = new ProduceBehavior(this);
  }

  /**
   * @returns {Array.<Dna.Information>}
   */
  getDnaList() {
    return this.dnaList;
  }

  /**
   * @param {number} amount
   * @returns {?Array.<Cell>}
   */
  performProduce(amount) {
    const { produceBehavior } = this;
    if (produceBehavior) {
      return produceBehavior.produce(amount);
    }
    return null;
  }

  /**
   * @param {Array.<Dna.Information>} dnaList
   */
  setDnaList(dnaList) {
    this.dnaList = dnaList;
  }

  /**
   * @param {ProduceBehavior} produceBehavior
   */
  setProduceBehavior(produceBehavior) {
    this.produceBehavior = produceBehavior;
  }
}

module.exports = ProducerCell;
