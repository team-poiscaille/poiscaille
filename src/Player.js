const Dna = require('./entity/Dna');

/** Class representing a player. */
class Player {
  /**
   * @param socket
   * @param {string} id           The unique ID to identify player
   * @param {string} username
   * @param {Room} room
   */
  constructor(socket, id, username, room) {
    this.socket = socket;
    this.id = id;
    this.username = username;
    this.room = room;
    this.nutrients = 0;
    /**
     * The list of DNA player have
     * @type {Array.<Dna.Information>}
     */
    this.dnaList = [];
  }

  getSocket() {
    return this.socket;
  }

  /**
   * Returns username of player
   *
   * @returns {string}
   */
  getName() {
    return this.username;
  }

  /**
   * @param {Room} room
   */
  setRoom(room) {
    this.room = room;
  }

  /**
   * @returns {Room}
   */
  getRoom() {
    return this.room;
  }

  /**
   * Adds DNA information player have
   * @param {object|Dna.Information} dna
   */
  addDna(dna) {
    if (!(dna instanceof Dna.Information)) {
      dna = dna.parse(dna);
    }

    this.dnaList.push(dna);
  }

  getAllDna() {
    const arr = [];
    this.dnaList.forEach(dna => arr.push(dna));
    return arr;
  }

  addNutrients(value) {
    this.nutrients += value;
    this.updateNutrients();
  }

  subtractNutrients(value) {
    this.nutrients -= value;
    this.updateNutrients();
  }

  getNutrients() {
    return this.nutrients;
  }

  updateNutrients() {
    this.socket.emit('player nutrient update', this.nutrients);
  }
}

module.exports = Player;
