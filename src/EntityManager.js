class EntityManager {
  /**
   * @param {Array.<Entity>} entities
   */
  constructor(entities = []) {
    this.entities = entities;
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
    const { entities } = this;
    return entities.find(entity => entity.getId() === id) || null;
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
    const { entities } = this;
    return entities.findIndex(entity => entity.getId() === id) >= 0;
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

module.exports = EntityManager;
