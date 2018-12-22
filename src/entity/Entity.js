/**
 * Class representing an entity.
 */
class Entity {
  /**
   * @param {number} id
   * @param {Vector2} position
   */
  constructor(id, position) {
    this.id = id;
    this.pos = position;
    this.onUpdatedListeners = [];
  }

  /**
   * @callback Entity~onUpdatedListener
   * @param {Entity} entity
   */
  /**
   * @param {Entity~onUpdatedListener} onUpdatedListener
   */
  addOnUpdatedListener(onUpdatedListener) {
    this.onUpdatedListeners.push(onUpdatedListener);
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
    return this.x;
  }

  /**
   * @returns {number}
   */
  getY() {
    return this.y;
  }

  /** */
  removeAllOnUpdatedListeners() {
    this.onUpdatedListeners = [];
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
    this.position.setX(x);
  }

  /**
   * @param {number} y
   */
  setY(y) {
    this.position.setY(y);
  }

  /** */
  update() {
    this.onUpdatedListeners.forEach(onUpdatedListener => onUpdatedListener(this));
  }
}

module.exports = Entity;
