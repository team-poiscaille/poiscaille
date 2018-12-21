const CellManager = require('./CellManager');

class World {
  constructor() {
    this.cellManager = new CellManager();
  }
}

module.exports = World;
