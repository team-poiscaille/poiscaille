const Entity = require('./Entity');

class Cell extends Entity {
  /**
   * @param {number} id
   * @param {number} x
   * @param {number} y
   * @param {number} hp
   * @param {number} atk
   * @param {number} def
   * @param {CellColors} color
   */
  constructor(id, x, y, hp, atk, def, color) {
    super('cell', id, x, y);
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.color = color;
    this.attackBehavior = null;
    this.collectBehavior = null;
    this.onDamagedListener = null;
    this.onKilledListener = null;
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

  kill() {
    const { onKilledListener } = this;
    this.hp = 0;
    if (onKilledListener) {
      onKilledListener.onKilled();
    }
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

  /**
   * @param {number} atk
   */
  setAtk(atk) {
    this.atk = atk;
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
      const { onDamagedListener } = this;
      if (onDamagedListener) {
        onDamagedListener.onDamaged();
      }
    }
    if (hp <= 0) {
      this.kill();
    } else {
      this.hp = hp;
    }
  }
}

module.exports = Cell;
