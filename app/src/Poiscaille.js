import Player from './Player';
import Render from './render/Render';

class Poiscaille {
  constructor() {
    this.entities = new Map();
    this.items = new Map();
    this.loadedChunk = [];
    this.player = new Player(this);
  }

  initRenderer() {
    this.renderer = new Render(this);
  }
}

export default Poiscaille;
