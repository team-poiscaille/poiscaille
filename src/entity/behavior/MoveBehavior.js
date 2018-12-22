const CellBehavior = require('./CellBehavior');

/**
 * Class representing a move behavior.
 * @extends MoveBehavior
 */
class MoveBehavior extends CellBehavior {
  /**
   * @param {Cell} performer
   */
  constructor(performer) {
    super(performer);
    this.destination = null;
    this.limiter = null;
    performer.addUpdateListener((cell) => {
      const destinationNow = this.destination;
      if (destinationNow) {
        const positionNow = cell.getPosition();
        const speedNow = cell.getSpeed();
        if (positionNow.equals(destinationNow)) {
          this.destination = null;
        } else {
          const { x, y } = positionNow;
          const { x: dx, y: dy } = destinationNow;
          if (dx > x) {
            cell.setX(Math.min(x + speedNow, dx));
          } else if (dx < x) {
            cell.setX(Math.max(x - speedNow, dx));
          }
          if (dy > y) {
            cell.setY(Math.min(y + speedNow, dy));
          } else if (dy < y) {
            cell.setY(Math.max(y - speedNow, dy));
          }
        }
      }
    });
  }

  /**
  * @todo Set limits
  * @returns {boolean}
  */
  canMove() {
    const { limiter } = this;
    if (limiter) {
      return limiter(this);
    }
    return true;
  }

  /**
   * @returns {?MoveBehavior~limiter}
   */
  getLimiter() {
    return this.limiter;
  }

  /**
   * @param {Vector2} destination
   */
  move(destination) {
    this.destination = destination;
  }

  /**
   * @param {?MoveBehavior~limiter} limiter
   */
  setLimiter(limiter) {
    this.limiter = limiter;
  }
}

/**
 * @callback MoveBehavior~limiter
 * @param {Cell} cell
 */

module.exports = MoveBehavior;
