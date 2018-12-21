class Vector2 {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
   * @param val
   */
  setX(val) {
    this.x = val;
  }

  /**
   * @param val
   */
  setY(val) {
    this.y = val;
  }

  /**
   * Returns distance between two vectors
   *
   * @param {Vector2} vec
   */
  distance(vec) {
    return Math.hypot(vec.x - this.x, vec.y - this.y);
  }

  /**
   * Returns dot product of two vectors
   *
   * @param {Vector2} vec
   */
  dot(vec) {
    return vec.x * this.x + vec.y * this.y;
  }

  /**
   * @param {Vector2|number} x
   * @param {number} y
   *
   * @returns Vector2
   */
  add(x, y = 0) {
    if (x instanceof Vector2) {
      return new Vector2(this.x + x.x, this.y + x.y);
    }
    return new Vector2(this.x + x, this.y + y);
  }

  /**
   * @param {Vector2|number} x
   * @param {number} y
   *
   * @returns {Vector2}
   */
  subtract(x, y = 0) {
    if (x instanceof Vector2) {
      return new Vector2(this.x - x.x, this.y - x.y);
    }

    return new Vector2(this.x - x, this.y - y);
  }

  /**
   * @returns Vector2
   */
  asVector2() {
    return new Vector2(this.x, this.y);
  }
}

module.exports = Vector2;

