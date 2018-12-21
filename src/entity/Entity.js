const Vector2 = require('../math/Vector2');

/**
 * Class representing an entity.
 * @extends Vector2
 */
class Entity extends Vector2 {
  /**
   * @param {string} name
   * @param {number} id
   * @param {Vector2} pos
   * @param {Player} owner
   */
  constructor(name, id, pos, owner) {
    super(pos.x, pos.y);
    this.name = name;
    this.id = id;
    this.owner = owner;
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
   * Returns owner of the entity
   * @returns {Player}
   */
  getOwner() {
    return this.owner;
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
   * @param {Player} owner
   */
  setOwner(owner) {
    this.owner = owner;
  }
}

module.exports = Entity;
