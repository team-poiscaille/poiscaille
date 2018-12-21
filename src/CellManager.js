const EntityManager = require('./EntityManager');

class CellManager extends EntityManager {
  /**
   * @param {number} id
   * @param {number} x
   * @param {number} y
   */
  moveTo(id, x, y) {
    const cell = this.find(id);
    if (cell) {
      cell.setX(x);
      cell.setY(y);
    }
  }
}

module.exports = CellManager;
