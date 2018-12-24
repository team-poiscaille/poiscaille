/** Class representing a vector 2D. */
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
   * @param {Vector2} vec1
   * @param {Vector2} vec2
   */
  static equals(vec1, vec2) {
    return vec1.x === vec2.x && vec1.y === vec2.y;
  }

  /**
   * @param {Vector2} vec
   */
  equals(vec) {
    return this.x === vec.x && this.y === vec.y;
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
   * Returns the length of the vector
   *
   * @returns {number}
   */
  length() {
    return Math.hypot(this.x, this.y);
  }

  /**
   * @returns {Vector2}
   */
  normalize() {
    const len = this.length();
    if (len > 0) {
      return new Vector2(this.x / len, this.y / len);
    }

    return new Vector2(0, 0);
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
   * @param {number} val
   * @returns {Vector2}
   */
  multiply(val) {
    return new Vector2(this.x * val, this.y * val);
  }

  /**
   * @returns Vector2
   */
  asVector2() {
    return new Vector2(this.x, this.y);
  }

  /**
   * @returns {Array.<number>}
   */
  toArray() {
    return [this.x, this.y];
  }
}

module.exports = Vector2;
