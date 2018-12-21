const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Constants = require('./Constants');
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
      this.player = null;

      const that = this;
      socket.on('init', (data) => {
        const id = Utils.getRandomString(32);
        const { username } = data;
        that.player = new Player(id, username, null);
      });

      socket.on('my other event', (data) => {
        console.log(data);
      });

      // Start match making
      socket.on('player match', (data) => {
        this.addMatchingPlayer(that.player);

        that.socket.emit('ack player match');
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
   * Match rooms for matching players
   */
  matchRooms() {
    while (this.matching.length >= Constants.PLAYERS_PER_ROOM) {
      const room = new Room(this);
      for (let i = 0; i < Constants.PLAYERS_PER_ROOM; i += 1) {
        const player = this.matching.shift();
        room.addPlayer(player);
      }
      // TODO broadcast match to players
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
