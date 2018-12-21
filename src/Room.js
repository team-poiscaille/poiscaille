const World = require('./World');

/** Class representing a room. */
class Room {
  /**
   * @param {Server} server
   */
  constructor(server) {
    this.server = server;

    this.world = new World();
    this.players = [];
  }

  /**
   * Returns if room has player
   *
   * @param player
   * @returns {boolean}
   */
  hasPlayer(player) {
    for (const p of this.players) {
      if (p === player) return true;
    }
    return false;
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
