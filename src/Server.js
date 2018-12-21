const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Utils = require('./util/Utils');

let instance;

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

      socket.on('my other event', (data) => {
        console.log(data);
      });

      this.socket = socket;
    });

    this.app = app;
    this.server = server;
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

  /**
   * @param {Player} player
   *
   * @returns {Room}
   */
  getRoomOfPlayer(player) {
    for(const room of this.rooms) {
      if(room.hasPlayer(player)) {
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
