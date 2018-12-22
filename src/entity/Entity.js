const EventEmitter = require('events');

/**
 * Class representing an entity.
 * @extends EventEmitter
 */
class Entity extends EventEmitter {
  /**
   * @param {number} id
   * @param {Vector2} position
   */
  constructor(id, position) {
    super();
    this.id = id;
    this.position = position;
  }

  /**
   * @callback Entity~onUpdated
   * @param {Entity} entity
   */
  /**
   * @param {Entity~onUpdated} onUpdated
   */
  addUpdateListener(onUpdated) {
    this.addListener('update', onUpdated);
  }

  /**
   * @param {Entity} entity
   * @returns {number}
   */
  calculateDistance(entity) {
    return this.position.distance(entity.getPosition());
  }

  /**
   * @returns {number}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {Vector2}
   */
  getPosition() {
    return this.position;
  }

  /**
   * @returns {number}
   */
  getX() {
    return this.position.x;
  }

  /**
   * @returns {number}
   */
  getY() {
    return this.position.y;
  }

  /**
   * @returns {boolean}
   */
  hasId() {
    return this.id !== -1;
  }

  /** */
  removeAllUpdateListeners() {
    this.removeAllListeners('update');
  }

  /**
   * @param {number} id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * @param {Vector2} position
   */
  setPosition(position) {
    this.position = position;
  }

  /**
   * @param {number} x
   */
  setX(x) {
    this.position.x = x;
  }

  /**
   * @param {number} y
   */
  setY(y) {
    this.position.y = y;
  }

  /** */
  update() {
    this.emit('update', this);
  }
}

module.exports = Entity;
