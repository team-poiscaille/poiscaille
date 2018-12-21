/** Class representing a world. */
class World {
  constructor() {
    this.entities = [];
  }

  /**
   * @param {Entity} entity
   */
  add(entity) {
    this.entities.push(entity);
  }

  /**
   * @param {number} id
   * @returns {?Entity}
   */
  find(id) {
    return this.entities.find(entity => entity.getId() === id) || null;
  }

  /**
   * @returns {Array.<Entity>}
   */
  getAll() {
    return this.entities;
  }

  /**
   * @param {number} id
   * @returns {boolean}
   */
  has(id) {
    return this.entities.findIndex(entity => entity.getId() === id) >= 0;
  }

  /**
   * @param {number} id
   */
  remove(id) {
    const { entities } = this;
    const index = entities.findIndex(entity => entity.getId() === id);
    if (index >= 0) {
      entities.splice(index, 1);
    }
  }
}

module.exports = World;
