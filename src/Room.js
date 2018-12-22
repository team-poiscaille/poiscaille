const Cell = require('./entity/Cell');
const Config = require('./Config');
const Errors = require('./Errors');
const Player = require('./Player');
const Utils = require('./Utils');
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

    this.globalPackets = [];
    this.nearbyPackets = [];
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

  processTick() { // TODO make it called
    this.globalPackets.forEach(pk => this.players.forEach(p => p.getSocket().emit(pk[0], pk[1])));

    this.nearbyPackets.forEach((pk) => {
      /** @type {Vector2} pos */
      const pos = pk[0];

      this.players.forEach((p) => {
        /** @type {Player} p */
        this.world.getAll()
          .filter(e => e instanceof Cell
            && e.getOwner() === p
            && e.getPosition().distance(pos) < Config.RENDER_MAX_DISTANCE)
          .forEach(() => p.getSocket().emit(pk[1], pk[2]));
      });
    });
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

    const socket = player.getSocket();
    // Player is quitting
    socket.on('player quit', () => {
      const room = socket.player.getRoom();
      if (room !== null) {
        room.removePlayer(socket.player);
        socket.emit('player quit');
      } else {
        socket.emit('player quit error', Errors.PLAYER_NOROOM);
      }
    });

    // Player requested to move cell to the position
    socket.on('cell move', (data) => {
      const { id, x, y } = data;
      if (!Utils.validateNumber(x) || !Utils.validateNumber(y) || !Utils.validateNumber(id)) {
        socket.emit('cell move error', Errors.INVALID_ARGUMENTS); return;
      }

      const room = socket.player.getRoom();
      if (room === null) {
        socket.emit('cell move error', Errors.PLAYER_NOROOM); return;
      }

      room.handlePacket(socket.player, 'cell move', { id, x, y });
    });

    // Player requested cell creation
    socket.on('cell create', (data) => {
      /**
       * @var {number} parent The ID of parent cell
       */
      const { parent, count } = data;
      if (!Utils.validateNumber(parent) || !Utils.validateNumber(count)) {
        socket.emit('cell create error', Errors.INVALID_ARGUMENTS); return;
      }

      const room = socket.player.getRoom();
      if (room === null) {
        socket.emit('cell create error', Errors.PLAYER_NOROOM); return;
      }

      room.handlePacket(socket.player, 'cell create', { parent, count });
    });

    socket.on('cell dna update', (data) => {
      /**
       * @var {number} id The ID of cell which is requested to update DNA
       * @var {number} dnaList The list of DNA being updated
       */
      const { id, dnaList } = data;
      if (!Utils.validateNumber(id)) { // TODO validate dnaList {Array.<String>}
        socket.emit('cell dna update error', Errors.INVALID_ARGUMENTS); return;
      }

      const room = socket.player.getRoom();
      if (room === null) {
        socket.emit('cell dna update error', Errors.PLAYER_NOROOM); return;
      }

      room.handlePacket(socket.player, 'cell dna update', { id, dnaList });
    });

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

    [
      'player quit', 'cell move', 'cell create', 'cell dna update',
    ].forEach(player.getSocket().off);

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
   * Broadcast event to nearby entities
   * @param {Vector2} position
   * @param {string} event
   * @param data
   */
  broadcastNearby(position, event, data) {
    this.nearbyPackets.push([position, event, data]);
  }

  /**
   * Broadcast event to players in room
   *
   * @param {string} event
   * @param {object} data
   */
  broadcastGlobally(event, data) {
    this.globalPackets.push([event, data]);
  }

  broadcastMatchMade() {
    const players = [];
    this.players.forEach(player => players.push({
      i: player.id,
      u: player.username,
    }));

    this.broadcastGlobally('room match made', {
      players,
    });
  }

  /**
   * @param {Player} player
   */
  broadcastPlayerQuit(player) {
    this.broadcastGlobally('room player quit', player.id);
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
