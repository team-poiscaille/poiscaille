const AttackBehavior = require('./AttackBehavior');

/**
 * Class representing a ranged attack behavior.
 * @extends AttackBehavior
 */
class RangedAttackBehavior extends AttackBehavior {
  /**
   * @todo Set penalty (temp = 10)
   * @param {Cell} cell
   */
  attack(cell) {
    if (this.canAttack(cell)) {
      const performer = this.getPerformer();
      const advantage = this.calculateAdvantageTo(cell);
      cell.damage(cell.getHp() - (performer.getAtk() - cell.getDef()) * advantage);
      performer.setDef(performer.getDef() - 10);
    }
  }

  /**
   * @todo Set min distance (temp = 50)
   * @param {Cell} cell
   * @returns {boolean}
   */
  canAttack(cell) {
    return this.getPerformer().calculateDistance(cell) <= 50;
  }
}

module.exports = RangedAttackBehavior;
