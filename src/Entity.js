const Vector2 = require('./math/Vector2');

class Entity extends Vector2 {
  /**
   * @param {string} name
   * @param {number} id
   * @param {Vector2} pos
   */
  constructor(name, id, pos) {
    super(pos.x, pos.y);

    this.name = name;
    this.id = id;
  }

  /**
   * @returns {number}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @param {number} id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * @param {string} name
   */
  setName(name) {
    this.name = name;
  }
}

module.exports = Entity;
