const CellBehavior = require('./CellBehavior');
const ProductionCell = require('../ProductionCell');

/**
 * Class representing a producing behavior.
 * @extends ProduceBehavior
 */
class ProduceBehavior extends CellBehavior {
  /**
   * @param {Array.<Dna.Information>} dnaList
   * @returns {number}
   */
  static calculateRequiredNutrients(dnaList) {
    // To do
  }

  /**
   * @param {Array.<Dna.Information>} dnaList
   * @returns {Cell.State}
   */
  static createStateFromDnaList(dnaList) {
    // To do
  }

  /**
   * @param {number} amount
   * @returns {boolean}
   */
  canProduce(amount) {
    const performer = this.getPerformer();
    const nutrients = performer.getOwner().getNutrients();
    const requiredNutrients = ProduceBehavior.calculateRequiredNutrients(performer.getDnaList());
    return nutrients >= requiredNutrients * amount;
  }

  /**
   * @param {number} amount
   * @returns {?Array.<ProductionCell>}
   */
  produce(amount) {
    if (this.canProduce(amount)) {
      const performer = this.getPerformer();
      const dnaList = performer.getDnaList();
      const owner = performer.getOwner();
      const position = performer.getPosition();
      const state = ProduceBehavior.createStateFromDnaList(dnaList);
      const requiredNutrients = ProduceBehavior.calculateRequiredNutrients(dnaList);
      owner.subtractNutrients(requiredNutrients * amount);
      const cells = [];
      for (let i = 0; i < amount; i += 1) {
        cells.push(new ProductionCell(-1, position, owner, state));
      }
      return cells;
    }
    return null;
  }
}

module.exports = ProduceBehavior;
