const AttackBehavior = require('./AttackBehavior');

/**
 * Class representing a compound attack behavior.
 * @extends AttackBehavior
 */
class CompoundAttackBehavior extends AttackBehavior {
  /**
   * @param {Cell} performer
   * @param {Array.<AttackBehavior>} [attackBehaviors=[]]
   */
  constructor(performer, attackBehaviors = []) {
    super(performer);
    this.attackBehaviors = attackBehaviors;
  }

  /**
   * @param {AttackBehavior} attackBehavior
   */
  addAttackBehavior(attackBehavior) {
    this.attackBehaviors.push(attackBehavior);
  }

  /**
   * @param {Cell} cell
   */
  attack(cell) {
    this.attackBehaviors.forEach(attackBehavior => attackBehavior.attack(cell));
  }

  /** */
  removeAllAttackBehaviors() {
    this.attackBehaviors = [];
  }
}

module.exports = CompoundAttackBehavior;
