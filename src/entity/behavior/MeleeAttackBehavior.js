const AttackBehavior = require('./AttackBehavior');

/**
 * Class representing a melee attack behavior.
 * @extends AttackBehavior
 */
class MeleeAttackBehavior extends AttackBehavior {
  /**
   * @param {Cell} cell
   */
  attack(cell) {
    if (this.canAttack(cell)) {
      const performer = this.getPerformer();
      const advantage = this.calculateAdvantageTo(cell);
      cell.damage(cell.getHp() - (performer.getAtk() - cell.getDef()) * advantage);
    }
  }

  /**
   * @todo Set min distance (temp = 10)
   * @param {Cell} cell
   * @returns {boolean}
   */
  canAttack(cell) {
    return this.getPerformer().calculateDistance(cell) <= 10;
  }
}

module.exports = MeleeAttackBehavior;
