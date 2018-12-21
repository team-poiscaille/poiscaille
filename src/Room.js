const World = require('./World');

/** Class representing a room. */
class Room {
  /**
   * @param {Server} server
   */
  constructor(server) {
    this.players = [];
    this.server = server;
    this.world = new World();
  }

  /**
   * Returns if room has player
   * @param {string} playerName
   * @returns {boolean}
   */
  hasPlayer(playerName) {
    return this.players.findIndex(player => player.getName() === playerName) >= 0;
  }

  /**
   * @param {Player} player
   */
  addPlayer(player) {
    if (this.server.getRoomOfPlayer(player) !== null) return false;

    this.players.push(player);
    player.setRoom(this);
    return true;
  }

  /**
   * Returns the number of players in this room
   *
   * @returns {number}
   */
  get size() {
    return this.players.length;
  }

  /**
   * @returns {World}
   */
  getWorld() {
    return this.world;
  }

  /**
   * @param {World} world
   */
  setWorld(world) {
    this.world = world;
  }
}

module.exports = Room;
