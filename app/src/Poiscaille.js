import Player from './Player';
import Render from './render/Render';

class Poiscaille {
  port = '3000';

  constructor() {
    this.entities = new Map();
    this.items = new Map();
    this.loadedChunk = [];
    this.player = new Player(this);

    this.serverUrl = `${location.protocol}//${location.host}:${this.PORT}`;
  }

  initGame() {
    this.initRenderer();
  }

  initRenderer() {
    this.renderer = new Render(this);
  }
}

export default Poiscaille;
