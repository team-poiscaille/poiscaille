const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const Config = require('./Config');
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

        socket.emit('ack player match');

        this.matchRooms();
        this.broadcastMatchedPlayers();
      });

      // Player is quitting
      socket.on('player quit', (data) => {
        const room = socket.player.getRoom();
        if (room !== null) {
          room.removePlayer(socket.player);
        }
      });

      // Player quit finding match
      socket.on('player match cancel', () => {
        if (this.removeMatchingPlayer()) {
          this.broadcastMatchedPlayers();
        }
      });

      this.socket = socket;
    });

    this.app = app;
    this.server = server;
    /**
     * Players who are making match
     * @type {Array.<Player>}
     */
    this.matching = [];
    this.rooms = [];
  }

  broadcastToMatching(event, data) {
    this.matching.forEach(player => player.getSocket().emit(event, data));
  }

  broadcastMatchedPlayers() {
    this.broadcastToMatching('match players', this.matching.length);
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

  removeMatchingPlayer(player) {
    const index = this.matching.findIndex(player);
    if (index < 0) return false;

    this.matching.splice(index, 1);
    return true;
  }

  /**
   * Match rooms for matching players
   */
  matchRooms() {
    while (this.matching.length >= Config.PLAYERS_PER_ROOM) {
      const room = new Room(this);
      for (let i = 0; i < Config.PLAYERS_PER_ROOM; i += 1) {
        const player = this.matching.shift();
        room.addPlayer(player);
      }
      room.broadcastMatchMade();
      this.rooms.push(room);
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
