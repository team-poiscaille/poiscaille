import io from 'socket.io-client';
import Player from './Player';
import Render from './render/Render';

import api from './utils/api';

class Poiscaille {
  port = '3000';

  constructor() {
    this.entities = new Map();
    this.items = new Map();
    this.loadedChunk = [];
    this.player = new Player(this);

    this.serverUrl = `${window.location.protocol}//${window.location.host.split(':').shift()}:${this.port}`;
    this.socket = io(this.serverUrl);
    this.api = api(this.socket);
  }

  initGame() {
    this.initRenderer();
  }

  initRenderer() {
    this.renderer = new Render(this);
    this.renderer.resize();
    this.renderer.loop();
  }
}

export default Poiscaille;
