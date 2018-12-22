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
    return performer.calculateDistance(cell) <= performer.getState().meleeAttackDistance;
  }
}

module.exports = MeleeAttackBehavior;
