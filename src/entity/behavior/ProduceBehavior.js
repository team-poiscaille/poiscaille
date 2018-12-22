const CellBehavior = require('./CellBehavior');

/**
 * Class representing a producing behavior.
 * @extends ProduceBehavior
 */
class ProduceBehavior extends CellBehavior {
  canProduce(amount) {
    const owner = this.getPerformer().getOwner();
  }

  produce(amount) {
    if (this.canProduce(amount)) {
      const performer = this.getPerformer();
    }
  }
}

module.exports = ProduceBehavior;
