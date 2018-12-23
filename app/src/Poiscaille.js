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
    this.socket.on('cell position', async (cellList) => {
      const unfulfilledCells = [];

      cellList.forEach(({ id, x, y }) => {
        if (!this.entities[id]) {
          unfulfilledCells.push(id);
          return;
        }

        this.entities[id].x = x;
        this.entities[id].y = y;
        this.entities[id].updated = true;
      });

      const cells = await this.socket.apiCall('cell info', unfulfilledCells);
      cells.forEach(({
        id, position, state, type,
      }) => {
        this.entities.set(id, this.createCellFromAttributes({ position, state, type }));
      });

      this.entities = this.entities.filter((cell) => {
        const {updated} = cell;
        cell.updated = false;

        return updated;
      });
    });

    document.addEventListener('mousemove', ({screenX, screenY}) => {
      this.player.cursor.x = screenX;
      this.player.cursor.y = screenY;
    });

    document.addEventListener('mousedown', () => {
      this.player.startSelect();
    });

    document.addEventListener('mouseup', () => {
      this.player.endSelect();
    });
  }

  createCellFromAttributes({position, state, type}) {
    // TODO
  }
}

export default Poiscaille;
