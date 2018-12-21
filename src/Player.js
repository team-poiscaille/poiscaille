
class Player {
  /**
   * @param {Room} room
   */
  constructor(room) {
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
