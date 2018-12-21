const World = require('./World');

/** Class representing a room. */
class Room {
  /**
   * @param {Server} server
   */
  constructor(server) {
    /**
     * @type {Array.<Player>}
     */
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
    if (player.getRoom() !== null) return false;

    this.players.push(player);
    player.setRoom(this);
    return true;
  }

  /**
   * Remove player from room and all linked entities
   *
   * @param player
   * @returns {boolean}
   */
  removePlayer(player) {
    const index = this.players.findIndex(player);
    if(index < 0) return false;

    this.world.getAll().forEach(entity => {
      if(entity.getOwner() === player) this.world.remove(entity.getId());
    });

    this.players.splice(index, 1);
    return true;
  }

  /**
   * Broadcast event to players in room
   *
   * @param {string} event
   * @param {object} data
   */
  broadcast(event, data) {
    this.players.forEach(player => {
      player.getSocket().emit(event, data);
    });
  }

  broadcastMatchMade() {
    const players = [];
    this.players.forEach(player => players.push({
      'i': player.id,
      'u': player.username
    }));

    this.broadcast('room match made', {
      players
    });
  }

  /**
   * @param {Player} player
   */
  broadcastPlayerQuit(player) {
    this.broadcast('room player quit', player.id);
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
