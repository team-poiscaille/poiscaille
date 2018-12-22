const { CellFactory, ItemFactory } = require('./entity');
const { Vector2 } = require('./math');

/** Class representing a world. */
class World {
  /**
   * @param {Room} room
   */
  constructor(room) {
    this.room = room;
    this.width = 1000;
    this.height = 1000;
    this.timeout = null;
    this.cellFactory = new CellFactory();
    this.itemFactory = new ItemFactory();
    this.lastEntityId = 0; // DO NOT USE THIS VARIABLE!
    this.entities = []; // Use World#createNewCell or World#createNewItem instead.
  }

  /**
   * @param {string} eventName
   * @param {Object} data
   */
  broadcast(eventName, data) {
    this.room.broadcast(eventName, data);
  }

  /** */
  close() {
    clearInterval(this.timeout);
    this.timeout = null;
  }

  /**
   * @param {number} id
   * @returns {?Entity}
   */
  find(id) {
    return this.entities.find(entity => entity.getId() === id) || null;
  }

  /**
   * @returns {Array.<Entity>}
   */
  getAll() {
    return this.entities;
  }

  /**
   * @param {number} id
   * @returns {boolean}
   */
  has(id) {
    return this.entities.findIndex(entity => entity.getId() === id) >= 0;
  }

  /**
   * @returns {boolean}
   */
  isOpen() {
    return Boolean(this.timeout);
  }

  /** */
  open() {
    this.timeout = setInterval(() => {
      this.entities.forEach(entity => entity.update());
    }, 50); // interval: 20ms
  }

  /**
   * @param {string} eventName
   * @param {Object} data
   */
  receive(eventName, data) {
    switch (eventName) {
      case 'cell create':
        console.log(data);
        break;
      case 'cell move':
        console.log(data);
        break;
      case 'cell dna update':
        console.log(data);
        break;
      default:
        throw new Error();
    }
  }

  /**
   * @param {number} id
   */
  remove(id) {
    const { entities } = this;
    const index = entities.findIndex(entity => entity.getId() === id);
    if (index >= 0) {
      entities.splice(index, 1);
    }
  }
}

module.exports = World;
