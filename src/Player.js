
class Player {
  /**
   * @param {string} id           The unique ID to identify player
   * @param {string} username
   * @param {Room} room
   */
  constructor(id, username, room) {
    this.id = id;
    this.username = username;
    this.room = room;

    /**
     * Entity which is managed by the player
     * @type {Array.<Entity>}
     */
    this.entities = [];
  }

  /**
   * Returns username of player
   *
   * @returns {string}
   */
  getName() {
    return this.username;
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
