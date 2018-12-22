const Entity = require('./Entity');

/**
 * Class representing a cell.
 * @extends Entity
 */
class Cell extends Entity {
  /**
   * @param {number} id
   * @param {Vector2} pos
   * @param {Player} owner
   * @param {number} hp
   * @param {number} atk
   * @param {number} def
   * @param {Cell.Colors} color
   */
  constructor(id, pos, owner, hp, atk, def, color) {
    super(id, pos);
    this.owner = owner;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.color = color;
    this.attackBehavior = null;
    this.collectBehavior = null;
    this.onDamagedListeners = [];
    this.onKilledListeners = [];
  }

  /**
   * @callback Cell~onDamagedListener
   * @param {?Cell} attackerCell
   * @param {Cell} victimCell
   * @param {number} hp
   */
  /**
   * @param {Cell~onDamagedListener} onDamagedListener
   */
  addOnDamagedListener(onDamagedListener) {
    this.onDamagedListeners.push(onDamagedListener);
  }

  /**
   * @callback Cell~onKilledListener
   * @param {?Cell} murderCell
   * @param {Cell} victimCell
   */
  /**
   * @param {Cell~onKilledListener} onKilledListener
   */
  addOnKilledListener(onKilledListener) {
    this.onKilledListeners.push(onKilledListener);
  }

  /**
   * @param {number} hp
   */
  damage(hp) {
    this.hp = hp;
    this.onDamagedListeners.forEach(onDamagedListener => onDamagedListener(null, this, hp));
  }

  /**
   * @param {Cell} attackerCell
   * @param {number} hp
   */
  damagedBy(attackerCell, hp) {
    this.hp = hp;
    this.onDamagedListeners.forEach(onDamagedListener => onDamagedListener(attackerCell, this, hp));
  }

  /**
   * @returns {number}
   */
  getAtk() {
    return this.atk;
  }

  /**
   * @returns {number}
   */
  getColor() {
    return this.color;
  }

  /**
   * @returns {number}
   */
  getDef() {
    return this.def;
  }

  /**
   * @returns {number}
   */
  getHp() {
    return this.hp;
  }

  /**
   * Returns owner of the entity
   * @returns {Player}
   */
  getOwner() {
    return this.owner;
  }

  /** */
  kill() {
    this.hp = 0;
    this.onKilledListeners.forEach(onKilledListener => onKilledListener(null, this));
  }

  /**
   * @param {Cell} murderCell
   */
  killedBy(murderCell) {
    this.hp = 0;
    this.onKilledListeners.forEach(onKilledListener => onKilledListener(murderCell, this));
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  moveTo(x, y) {
    this.setX(x);
    this.setY(y);
  }

  /**
   * @param {Cell} targetCell
   */
  performAttack(targetCell) {
    const { attackBehavior } = this;
    if (attackBehavior) {
      attackBehavior.attack(targetCell);
    }
  }

  /**
   * @param {Item} targetItem
   */
  performCollect(targetItem) {
    const { collectBehavior } = this;
    if (collectBehavior) {
      collectBehavior.collect(targetItem);
    }
  }

  /** */
  removeAllOnDamagedListeners() {
    this.onDamagedListeners = [];
  }

  /** */
  removeAllOnKilledListeners() {
    this.onKilledListeners = [];
  }

  /**
   * @param {number} atk
   */
  setAtk(atk) {
    this.atk = atk;
  }

  /**
   * @param {AttackBehavior} attackBehavior
   */
  setAttackBehavior(attackBehavior) {
    this.attackBehavior = attackBehavior;
  }

  /**
   * @param {CollectBehavior} collectBehavior
   */
  setCollectBehavior(collectBehavior) {
    this.collectBehavior = collectBehavior;
  }

  /**
   * @param {number} color
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * @param {number} def
   */
  setDef(def) {
    this.def = def;
  }

  /**
   * @param {number} hp
   */
  setHp(hp) {
    if (hp < this.hp) {
      this.damage(hp);
      if (hp <= 0) {
        this.kill();
      }
    } else {
      this.hp = hp;
    }
  }

  /**
   * @param {Player} owner
   */
  setOwner(owner) {
    this.owner = owner;
  }
}

/**
 * Enum representing cell advantages.
 * @readonly
 * @memberof Cell
 * @enum {number}
 */
const Advantages = {
  EFFECTIVE: 2,
  NORMAL: 1,
  NOT_EFFECTIVE: 0.5,
};

/**
 * Enum representing cell colors.
 * @readonly
 * @memberof Cell
 * @enum {number}
 */
const Colors = {
  RED: 0,
  GREEN: 1,
  BLUE: 2,
  NONE: 3,
};

Object.freeze(Advantages);
Object.freeze(Colors);

Cell.Advantages = Advantages;
Cell.Colors = Colors;

module.exports = Cell;
