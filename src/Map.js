const CellManager = require('./CellManager');

class Map {
  constructor() {
    this.cellManager = new CellManager();
  }
}

module.exports = Map;
