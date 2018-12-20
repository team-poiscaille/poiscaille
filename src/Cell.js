const Entity = require('./Entity');

class Cell extends Entity {
  /**
   * @param {number} id
   * @param {number} x
   * @param {number} y
   * @param {number} hp
   * @param {number} atk
   * @param {number} def
   * @param {CellColor} color
   */
  constructor(id, x, y, hp, atk, def, color) {
    super('cell', id, x, y);
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.color = color;
  }

  /**
   * @param {Cell} targetCell
   */
  attack(targetCell) {
    const { atk } = this;
    const advantage = this.calculateAdvantageTo(targetCell);
    targetCell.setHp(targetCell.getHp() - (atk - targetCell.getDef()) * advantage);
  }

  /**
   * @param {Cell} targetCell
   * @returns {number}
   */
  calculateAdvantageTo(targetCell) {
    const { color } = this;
    return color.calculateAdvantageTo(targetCell.getColor());
  }

  /**
   * @param {Item} item
   */
  collectItem(item) {
    item.collectedBy(this);
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
    this.hp = hp;
  }
}

module.exports = Cell;
