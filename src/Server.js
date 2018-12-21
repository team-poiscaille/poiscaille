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
        const username = data.username;
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
   * @returns {Array.<Room>}
   */
  getRooms() {
    return this.rooms;
  }

  addMatchingPlayer(player) {
    this.matching.push(player);
  }

  /**
   * Match rooms for matching players
   */
  matchRooms() {
    while(this.matching.length >= Constants.PLAYERS_PER_ROOM) {
      let room = new Room(this);
      for(let i = 0; i < Constants.PLAYERS_PER_ROOM; i++) {
        const player = this.matching.shift();
        room.addPlayer(player);
      }
      // TODO broadcast match to players
      this.rooms.push(room);
    }
  }

  /**
   * @param {Player} player
   *
   * @returns {Room}
   */
  getRoomOfPlayer(player) {
    for (const room of this.rooms) {
      if (room.hasPlayer(player)) {
        return room;
      }
    }

    return null;
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
