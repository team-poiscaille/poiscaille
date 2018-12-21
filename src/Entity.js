class Entity {
  /**
   * @param {string} name
   * @param {number} id
   * @param {number} x
   * @param {number} y
   */
  constructor(name, id, x, y) {
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
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
   * @returns {number}
   */
  getX() {
    return this.x;
  }

  /**
   * @returns {number}
   */
  getY() {
    return this.y;
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

  /**
   * @param {number} x
   */
  setX(x) {
    this.x = x;
  }

  /**
   * @param {number} y
   */
  setY(y) {
    this.y = y;
  }
}

module.exports = Entity;
