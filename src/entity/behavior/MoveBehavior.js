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
    performer.addUpdateListener((world, cell) => {
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
   * @param {Vector2} destination
   */
  move(destination) {
    this.destination = destination;
  }
}

module.exports = MoveBehavior;
