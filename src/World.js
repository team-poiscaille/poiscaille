const Entity = require('./entity/Entity');
const Vector2 = require('./math/Vector2');
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
    this.lastEntityId = 0; // DO NOT USE THIS VARIABLE!
    this.entities = [];
  }

  add(entity) {
    if (entity.hasId()) {
      entity.setId(this.lastEntityId);
      this.lastEntityId += 1;
      this.entities.push(entity);
    } else {
      throw new Error('ID allocated entity was found');
    }
  }

  attachCellListener(cell) {
    cell.addKilledListener((murderCell, victimCell) => {
      if (murderCell) {
        murderCell.getOwner().addNutrients();
      }
      this.remove(victimCell);
    });
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
        {
          const {
            id, // production cell ID
            amount, // how many produce cells
          } = data;
          const producerCell = this.find(id);
          if (producerCell) {
            const cells = producerCell.performProduce(amount);
            for (const cell of cells) {
              this.add(cell);
            }
          }
        }
        break;
      case 'cell move':
        {
          const {
            id, // cell ID
            x, // desitnation x
            y, // desitnation y
          } = data;
          const cell = this.find(id);
          if (cell) {
            cell.performMove(new Vector2(x, y));
          }
        }
        break;
      case 'cell dna update':
        {
          const {
            id, // production cell ID
            dnaList, // DNA list
          } = data;
          const producerCell = this.find(id);
          if (producerCell) {
            producerCell.setDnaList(Utils.createDnaListFromNames(dnaList));
          }
        }
        break;
      default:
        throw new Error();
    }
  }

  /**
   * @param {(Entity|number)} entity
   */
  remove(entity) {
    let id;
    if (typeof entity === 'number') {
      id = entity;
    } else if (entity instanceof Entity) {
      id = entity.getId();
    } else {
      throw new TypeError('invalid argument');
    }
    const { entities } = this;
    const index = entities.findIndex(element => element.getId() === id);
    if (index >= 0) {
      entities.splice(index, 1);
    }
  }
}

module.exports = World;
