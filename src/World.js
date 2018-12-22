const { ProductionCell } = require('./entity');

/** Class representing a world. */
class World {
  /**
   * @param {Room} room
   */
  constructor(room) {
    this.entities = [];
    this.room = room;
  }

  /**
   * @param {Entity} entity
   */
  add(entity) {
    this.entities.push(entity);
  }

  /**
   * Redirection of Room.broadcast
   * @param event
   * @param data
   */
  broadcast(event, data) {
    this.room.broadcast(event, data);
  }

  close() {
    // TODO
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

  /** */
  open() {
    const { socket } = this;
    socket.on('cell move', (id, x, y) => {
      const entity = this.find(id);
      if (entity && entity instanceof ProductionCell) {
        entity.moveTo(x, y);
      }
    });
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

  /** */
  update() {
    this.entities.forEach(entity => entity.update());
  }
}

module.exports = World;
