const MoveBehavior = require('./behavior/MeleeAttackBehavior');
const Entity = require('./Entity');

/**
 * Class representing a cell.
 * @extends Entity
 */
class Cell extends Entity {
  /**
   * @param {number} id
   * @param {Vector2} position
   * @param {Player} owner
   * @param {Cell.State} state
   */
  constructor(id, position, owner, state) {
    super(id, position);
    this.owner = owner;
    this.state = state;
    this.attackBehavior = null;
    this.collectBehavior = null;
    this.moveBehavior = new MoveBehavior(this);
  }

  /**
   * @callback Cell~onDamaged
   * @param {?Cell} attackerCell
   * @param {Cell} victimCell
   * @param {number} damage
   */
  /**
   * @param {Cell~onDamaged} onDamaged
   */
  addDamagedListener(onDamaged) {
    this.addListener('damaged', onDamaged);
  }

  /**
   * @callback Cell~onKilled
   * @param {?Cell} murderCell
   * @param {Cell} victimCell
   */
  /**
   * @param {Cell~onKilled} onKilled
   */
  addKilledListener(onKilled) {
    this.addListener('killed', onKilled);
  }

  /**
   * @param {number} hp
   */
  damage(hp) {
    this.hp = hp;
    this.emit('damaged', null, this, hp);
  }

  /**
   * @param {Cell} attackerCell
   * @param {number} hp
   */
  damagedBy(attackerCell, hp) {
    this.hp = hp;
    this.emit('damaged', attackerCell, this, hp);
  }

  /**
   * Returns owner of the entity
   * @returns {Player}
   */
  getOwner() {
    return this.owner;
  }

  /**
   * @returns {Cell.State}
   */
  getState() {
    return this.state;
  }

  /** */
  kill() {
    this.hp = 0;
    this.emit('killed', null, this);
  }

  /**
   * @param {Cell} murderCell
   */
  killedBy(murderCell) {
    this.hp = 0;
    this.emit('killed', murderCell, this);
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

  /**
   * @param {Vector2} destination
   */
  performMove(destination) {
    const { moveBehavior } = this;
    if (moveBehavior) {
      moveBehavior.move(destination);
    }
  }

  /** */
  removeAllDamagedListeners() {
    this.removeAllListeners('damaged');
  }

  /** */
  removeAllKilledListeners() {
    this.removeAllListeners('killed');
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
   * @param {MoveBehavior} moveBehavior
   */
  setMoveBehavior(moveBehavior) {
    this.moveBehavior = moveBehavior;
  }

  /**
   * @param {Player} owner
   */
  setOwner(owner) {
    this.owner = owner;
  }

  /**
   * @param {Cell.State} state
   */
  setState(state) {
    this.state = state;
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

/**
 * Class representing a cell state.
 * @memberof Cell
 */
class State {
  /**
   * @param {Object} details
   * @param {number} details.hp
   * @param {number} details.atk
   * @param {number} details.def
   * @param {number} details.speed
   * @param {Cell.Colors} details.color
   * @param {number} details.collectableDistance
   * @param {number} details.meleeAttackDistance
   * @param {number} details.rangedAttackDistance
   */
  constructor({
    hp, atk, def, speed, color,
    collectableDistance, meleeAttackDistance, rangedAttackDistance,
  }) {
    /** @type {number} */
    this.hp = hp;
    /** @type {number} */
    this.atk = atk;
    /** @type {number} */
    this.def = def;
    /** @type {number} */
    this.speed = speed;
    /** @type {Cell.Colors} */
    this.color = color;
    /** @type {number} */
    this.collectableDistance = collectableDistance;
    /** @type {number} */
    this.meleeAttackDistance = meleeAttackDistance;
    /** @type {number} */
    this.rangedAttackDistance = rangedAttackDistance;
  }
}

Object.freeze(Advantages);
Object.freeze(Colors);

Cell.Advantages = Advantages;
Cell.Colors = Colors;
Cell.State = State;

module.exports = Cell;
