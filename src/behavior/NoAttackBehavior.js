/* eslint class-methods-use-this: off */
const AttackBehavior = require('./AttackBehavior');

/**
 * Class representing a no attack behavior.
 * @extends AttackBehavior
 */
class NoAttackBehavior extends AttackBehavior {
  /**
   * @param {Cell} cell
   */
  attack() {}

  /**
   * @param {Cell} cell
   * @returns {boolean}
   */
  canAttack() {
    return false;
  }
}

module.exports = NoAttackBehavior;
