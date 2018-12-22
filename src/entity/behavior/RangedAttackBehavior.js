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
      const performerState = this.getPerformer().getState();
      const targetState = cell.getPerformer().getState();
      const advantage = this.calculateAdvantageTo(cell);
      cell.damage(targetState.hp - (performerState.atk - targetState.def) * advantage);
    }
  }

  /**
   * @param {Cell} cell
   * @returns {boolean}
   */
  canAttack(cell) {
    const performer = this.getPerformer();
    return performer.calculateDistance(cell) <= performer.getState().rangedAttackDistance;
  }
}

module.exports = RangedAttackBehavior;
