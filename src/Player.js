const Vector2 = require('./math/Vector2');

class Player extends Vector2 {
  /**
   * @param {Vector2} pos
   * @param {Room} room
   */
  constructor(pos, room) {
    super(pos.x, pos.y);

    this.room = room;
  }

  /**
   * @param {Room} room
   */
  setRoom(room) {
    this.room = room;
  }

  /**
   * @returns {Room}
   */
  getRoom() {
    return this.room;
  }
}

module.exports = Player;
