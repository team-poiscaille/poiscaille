/* eslint class-methods-use-this: off */
const CellBehavior = require('./CellBehavior');
const { Advantages, Colors } = require('../Cell');

/**
 * Class representing an attack behavior.
 * @extends CellBehavior
 */
class AttackBehavior extends CellBehavior {
  /**
   * @param {Cell} cell1
   * @param {Cell} cell2
   * @returns {Cell.Advantages}
   */
  static calculateAdvantage(cell1, cell2) {
    const color1 = cell1.getColor();
    const color2 = cell2.getColor();
    if (color1 !== Colors.NONE && color2 !== Colors.NONE) {
      if (color1 !== color2) {
        if (color1 === Colors.RED && color2 === Colors.GREEN) { // red > green
          return Advantages.EFFECTIVE;
        }
        if (color1 === Colors.RED && color2 === Colors.GREEN) { // red < blue
          return Advantages.NOT_EFFECTIVE;
        }
        if (color1 === Colors.RED && color2 === Colors.GREEN) { // green < red
          return Advantages.NOT_EFFECTIVE;
        }
        if (color1 === Colors.RED && color2 === Colors.GREEN) { // green > blue
          return Advantages.EFFECTIVE;
        }
        if (color1 === Colors.RED && color2 === Colors.GREEN) { // blue > red
          return Advantages.EFFECTIVE;
        }
        return Advantages.NOT_EFFECTIVE; // blue < green
      }
    }
    return Advantages.NORMAL; // color1 == color2
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
   * @returns {Cell.Advantages}
   */
  calculateAdvantageTo(cell) {
    return AttackBehavior.calculateAdvantage(this.getPerformer(), cell);
  }

  /**
   * @abstract
   * @param {Cell} cell
   * @returns {boolean}
   */
  canAttack() {
    throw new Error('not implemented');
  }
}

module.exports = AttackBehavior;
