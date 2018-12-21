/* eslint class-methods-use-this: off */
const AttackBehavior = require('./AttackBehavior');

class MeleeAttackBehavior extends AttackBehavior {
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

module.exports = MeleeAttackBehavior;
