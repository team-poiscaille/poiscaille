const { CellFactory, ItemFactory } = require('./entity');
const { Vector2 } = require('./math');
const Utils = require('./Utils');

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
    const { cellFactory, itemFactory } = this;
    switch (eventName) {
      case 'cell create':
        {
          const {
            id, // production cell ID
            amount, // how many produce cells
          } = data;
        }
        break;
      case 'cell move':
        {
          const {
            id, // cell ID
            x, // desitnation x
            y, // desitnation y
          } = data;
        }
        break;
      case 'cell dna update':
        {
          const {
            id, // production cell ID
            dnaList, // DNA list
          } = data;
        }
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
