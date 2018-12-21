
class Player {
  /**
   * @param {Room} room
   */
  constructor(room) {
    this.room = room;

    /**
     * Entity which is managed by the player
     * @type {Array.<Entity>}
     */
    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
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
