/** Class representing a player. */
class Player {
  /**
   * @param socket
   * @param {string} id           The unique ID to identify player
   * @param {string} username
   * @param {Room} room
   */
  constructor(socket, id, username, room) {
    this.socket = socket;
    this.id = id;
    this.username = username;
    this.room = room;

    /**
     * Entity which is managed by the player
     * @type {Array.<Entity>}
     */
    this.entities = [];
  }

  getSocket() {
    return this.socket;
  }

  /**
   * Returns username of player
   *
   * @returns {string}
   */
  getName() {
    return this.username;
  }

  /**
   * Add entity managed by the player
   *
   * @param entity
   */
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
