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

    this.timer = setInterval(() => this.processTick(), 50); // 20 ticks per second
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
      case 'cell state':
        // data = {
        //  id: id of cell
        // }
        this.world.receive('cell state', data);
        break;
      case 'cell info':
        // data = {
        //  player: the player requested
        //  idList: the list of cell ID
        // }
        this.world.receive('cell info', { player, idList: data.idList });
        break;
      default:
        // throw new Error();
    }
  }

  processTick() {
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
          .forEach(() => p.getSocket().emit(pk[1], ...pk[2]));
      });
    });
  }

  /**
   * @returns {number}
   */
  getId() {
    return this.id;
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
      this.removePlayer(player);
      socket.emit('player quit');
    });

    // Player requested to move cell to the position
    socket.on('cell move', (data) => {
      const { id, x, y } = data;
      if (!Utils.validateNumber(x) || !Utils.validateNumber(y) || !Utils.validateNumber(id)) {
        socket.emit('cell move error', Errors.INVALID_ARGUMENTS); return;
      }

      this.handlePacket(player, 'cell move', { id, x, y });
    });

    // Player requested cell creation
    socket.on('cell create', (data) => {
      console.log('data', data);
      /**
       * @var {number} parent The ID of parent cell
       */
      const { parent, count } = data;
      if (!Utils.validateNumber(parent) || !Utils.validateNumber(count)) {
        socket.emit('cell create error', Errors.INVALID_ARGUMENTS); return;
      }

      this.handlePacket(player, 'cell create', { parent, count });
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

      this.handlePacket(player, 'cell dna update', { id, dnaList });
    });

    socket.on('cell state', (data) => {
      const { id } = data;
      if (!Utils.validateNumber(id)) {
        socket.emit('cell state error', Errors.INVALID_ARGUMENTS); return;
      }

      this.handlePacket(player, 'cell state', { id });
    });

    socket.on('cell info', (data) => {
      const { idList } = data;
      // TODO validate idList (Array.<int>)

      this.handlePacket(player, 'cell info', { idList });
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
    ].forEach(v => player.getSocket().removeAllListeners(v));

    this.players.splice(index, 1);

    if (this.players.length <= 0) {
      this.server.removeRoom(this.id);
      this.world.close();
    }
    return true;
  }

  /**
   * @returns {Array.<Player>}
   */
  getPlayers() {
    const arr = [];
    this.players.forEach(v => arr.push(v));
    return arr;
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
  broadcastNearby(position, event, ...data) {
    this.nearbyPackets.push([position, event, data]);
  }

  /**
   * Broadcast event to players in room
   *
   * @param {string} event
   * @param {object} data
   */
  broadcastGlobally(event, ...data) {
    this.globalPackets.push([event, data]);
  }

  broadcastMatchMade() {
    const players = [];
    this.players.forEach(player => players.push({
      i: player.id,
      u: player.username,
    }));
    this.world.open();
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

  close() {
    clearInterval(this.timer);
  }
}

module.exports = Room;
