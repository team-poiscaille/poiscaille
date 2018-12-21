/* eslint class-methods-use-this: off */
const CellBehavior = require('./CellBehavior');
const CellAdvantages = require('../CellAdvantages');
const CellColors = require('../CellColors');

class AttackBehavior extends CellBehavior {
  /**
   * @param {Cell} cell1
   * @param {Cell} cell2
   * @returns {CellAdvantages}
   */
  static calculateAdvantage(cell1, cell2) {
    const color1 = cell1.getColor();
    const color2 = cell2.getColor();
    if (color1 !== color2) {
      if (color1 === CellColors.RED && color2 === CellColors.GREEN) { // red > green
        return CellAdvantages.EFFECTIVE;
      }
      if (color1 === CellColors.RED && color2 === CellColors.GREEN) { // red < blue
        return CellAdvantages.NOT_EFFECTIVE;
      }
      if (color1 === CellColors.RED && color2 === CellColors.GREEN) { // green < red
        return CellAdvantages.NOT_EFFECTIVE;
      }
      if (color1 === CellColors.RED && color2 === CellColors.GREEN) { // green > blue
        return CellAdvantages.EFFECTIVE;
      }
      if (color1 === CellColors.RED && color2 === CellColors.GREEN) { // blue > red
        return CellAdvantages.EFFECTIVE;
      }
      return CellAdvantages.NOT_EFFECTIVE; // blue < green
    }
    return CellAdvantages.NORMAL; // color1 == color2
  }

  /**
   * @abstract
   * @param {Cell} cell
   */
  attack() {
    throw new Error('not implemented');
  }

  /**
   * @param {Cell} cell
   * @returns {CellAdvantages}
   */
  calculateAdvantageTo(cell) {
    return AttackBehavior.calculateAdvantage(this.getPerformer(), cell);
  }

  /**
   * @abstract
   * @param {Cell} cell
   * @returns {boolean}
   */
  canAttack(cell) {
    return this.getPerformer().calculateDistance(cell) <= 10;
  }
}

module.exports = AttackBehavior;
