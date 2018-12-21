const Map = require('./Map');

class Room {
  constructor() {
    this.map = new Map();
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
