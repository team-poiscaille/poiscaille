const World = require('./World');

class Room {
  constructor() {
    this.world = new World();
  }

  /**
   * @returns {Map}
   */
  getMap() {
    return this.map;
  }

  /**
   * @param {Map} map
   */
  setMap(map) {
    this.map = map;
  }
}

module.exports = Room;
