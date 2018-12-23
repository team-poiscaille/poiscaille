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

  attachListeners() {
    this.socket.on('cell', async cellList => {
      const unfulfilledCells = [];
      cellList.forEach(({id, x, y}) => {
        if(!this.entities[id]) {
          unfulfilledCells.push(id);
          return;
        }

        this.entities[id].x = x;
        this.entities[id].y = y;
      });

      const cells = await this.socket.apiCall('cell info', unfulfilledCells);
      cells.forEach(cellObject => {
        this.entities.set(cellObject.id, createCellFromAttributes(cellObject));
      });
    });
  }

  createCellFromAttributes(attributes) {
    //TODO
  }
}

export default Poiscaille;
