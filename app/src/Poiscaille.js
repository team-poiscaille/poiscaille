import Player from "./Player";

class Poiscaille {
  constructor() {
    this.entities = new Map();
    this.items = new Map();
    this.loadedChunk = [];
    this.player = new Player(this);
  }
}

export default Poiscaille;
