const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const Config = require('./Config');
const Errors = require('./Errors');
const Player = require('./Player');
const Room = require('./Room');
const Utils = require('./Utils');

let instance;

/** Class representing a server. */
class Server {
  /**
   * @private
   */
  constructor() {
    const app = express();
    const server = http.createServer(app);
    const io = socketio(server);

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });

    // See https://socket.io/docs/#Using-with-Express
    io.on('connection', (socket) => {
      socket.emit('news', { hello: 'world' });
      socket.player = null;

      socket.on('init', (data) => {
        const id = Utils.getRandomString(32);
        const { username } = data;
        socket.player = new Player(socket, id, username, null);
      });

      // Start match making
      socket.on('player match', () => {
        this.addMatchingPlayer(socket.player);

        socket.emit('player match');

        this.matchRooms();
        this.broadcastMatchedPlayers();
      });

      // Player is quitting
      socket.on('player quit', () => {
        const room = socket.player.getRoom();
        if (room !== null) {
          room.removePlayer(socket.player);
        }
      });

      // Player quit finding match
      socket.on('player match cancel', () => {
        if (this.removeMatchingPlayer(socket.player)) {
          this.broadcastMatchedPlayers();
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
         * @var {number} dnas The list of DNA being updated
         */
        const { id, dnas } = data;
        if (!Utils.validateNumber(id)) { // TODO validate dnas {Array.<String>}
          socket.emit('cell dna update error', Errors.INVALID_ARGUMENTS); return;
        }

        const room = socket.player.getRoom();
        if (room === null) {
          socket.emit('cell dna update error', Errors.PLAYER_NOROOM); return;
        }

        room.handlePacket(socket.player, 'cell dna update', { id, dnas });
      });

      socket.on('disconnect', () => {
        const room = socket.player.getRoom();
        if (room !== null) room.removePlayer(socket.player);
        else if (this.removeMatchingPlayer(socket.player)) {
          this.broadcastMatchedPlayers();
        }
      });
    });

    this.app = app;
    this.server = server;
    /**
     * Players who are making match
     * @type {Array.<Player>}
     */
    this.matching = [];
    this.rooms = [];
    /**
     * A variable for allocating room ID.
     * DO NOT USE THIS VARIABLE! Use {@link Server#createNewRoom} instead.
     * @private
     * @type {number}
     */
    this.lastRoomId = 0;
  }

  /**
   * Creates new room
   * @returns {Room}
   */
  createNewRoom() {
    const room = new Room(this, this.lastRoomId);
    this.rooms.push(room);
    this.lastRoomId += 1;

    return room;
  }

  /**
   * @param {number} roomId
   * @returns {boolean}
   */
  hasRoom(roomId) {
    return this.rooms.findIndex(room => room.getId() === roomId) >= 0;
  }

  /**
   * @param {number} roomId
   */
  removeRoom(roomId) {
    const { rooms } = this;
    const index = rooms.findIndex(room => room.getId() === roomId);
    if (index >= 0) {
      rooms.splice(index, 1);
    }
  }

  broadcastToMatching(event, data) {
    this.matching.forEach(player => player.getSocket().emit(event, data));
  }

  broadcastMatchedPlayers() {
    this.broadcastToMatching('match players', {
      m: Config.PLAYERS_PER_ROOM,
      c: this.matching.length,
    });
  }

  /**
   * @returns {Server}
   */
  static getInstance() {
    if (!instance) {
      instance = new Server();
    }
    return instance;
  }

  /**
   * @returns {Express}
   */
  getApp() {
    return this.app;
  }

  /**
   * @param {Player} player
   * @returns {?Room}
   */
  getRoomOfPlayer(player) {
    return this.rooms.find(room => room.hasPlayer(player)) || null;
  }

  addMatchingPlayer(player) {
    this.matching.push(player);
  }

  /**
   * @param {Player} player
   * @returns {boolean}
   */
  removeMatchingPlayer(player) {
    const index = this.matching.findIndex(p => player === p);
    if (index < 0) return false;

    this.matching.splice(index, 1);
    return true;
  }

  /**
   * Match rooms for matching players
   */
  matchRooms() {
    while (this.matching.length >= Config.PLAYERS_PER_ROOM) {
      const room = this.createNewRoom();
      for (let i = 0; i < Config.PLAYERS_PER_ROOM; i += 1) {
        const player = this.matching.shift();
        room.addPlayer(player);
      }
      room.broadcastMatchMade();
    }
  }

  /**
   * @returns {Array.<Room>}
   */
  getRooms() {
    return this.rooms;
  }

  /**
   * @returns {http.Server}
   */
  getServer() {
    return this.server;
  }

  /**
   * @param {number} [port=3000]
   */
  start(port = 3000) {
    this.server.listen(port);
  }
}

module.exports = Server;
