const CellBehavior = require('./CellBehavior');
const Config = require('../../Config');
const Item = require('../Item');

/**
 * Class representing a move behavior.
 * @extends CellBehavior
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

        world
          .getAll()
          .filter(v => v instanceof Item
            && v.calculateDistance(cell) < Config.ITEM_PICKUP_DISTANCE)
          .forEach(v => v.collectedBy(cell));
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
