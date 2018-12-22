const Cell = require('./entity/Cell');
const Player = require('./Player');
const World = require('./World');

/** Class representing a room. */
class Room {
  /**
   * DO NOT USE THIS CONSTRUCTOR! Use {@link Server#createNewRoom} instead.
   * @param {Server} server
   * @param {number} id
   */
  constructor(server, id) {
    this.id = id;
    /**
     * @type {Array.<Player>}
     */
    this.players = [];
    this.server = server;
    this.world = new World(this);
  }

  /**
   * This function is for handling requests from players.
   *
   * @param {Player} player
   * @param {string} id
   * @param data
   */
  handlePacket(player, id, data) {
    switch (id) {
      case 'cell move':
        // data = {
        //  id: id of cell,
        //  x, y
        // }
        this.world.receive('cell move', data); // FIXME receive does not exist
        break;
      case 'cell create':
        // data = {
        //  parent: id of parent cell,
        //  count: count of cells requested to create
        // }
        this.world.receive('cell create', data);
        break;
      case 'cell dna update':
        // data = {
        //  id: id of cell
        //  dnaList: The list of dna name
        // }
        this.world.receive('cell dna update', data);
        break;
      default:
        // throw new Error();
    }
  }

  /**
   * Returns if room has player
   * @param {Player|string} player
   * @returns {boolean}
   */
  hasPlayer(player) {
    if (player instanceof Player) player = player.getName();
    return this.players.findIndex(p => p.getName() === player) >= 0;
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
   * @param {Player} player
   * @returns {boolean}
   */
  removePlayer(player) {
    const index = this.players.findIndex(p => p === player);
    if (index < 0) return false;

    this.world.getAll().forEach((entity) => {
      if (entity instanceof Cell) {
        if (entity.getOwner() === player) this.world.remove(entity.getId());
      }
    });

    this.players.splice(index, 1);
    return true;
  }

  /**
   * Returns player with provided ID if player is joined in this room
   *
   * @param id
   * @returns {Player}
   */
  getPlayerById(id) {
    return this.players.find(p => p.id === id);
  }

  /**
   * Broadcast event to players in room
   *
   * @param {string} event
   * @param {object} data
   */
  broadcast(event, data) {
    this.players.forEach((player) => {
      player.getSocket().emit(event, data);
    });
  }

  broadcastMatchMade() {
    const players = [];
    this.players.forEach(player => players.push({
      i: player.id,
      u: player.username,
    }));

    this.broadcast('room match made', {
      players,
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
