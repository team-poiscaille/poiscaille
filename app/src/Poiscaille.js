import io from 'socket.io-client';

import DNA from "./dna/DNA";
import Player from './Player';
import Render from './render/Render';
import EntityDNA from "./entity/EntityDNA";
import EntityNutrient from "./entity/EntityNutrient";
import EntityProducer from './entity/EntityProducer';
import EntityProduction from './entity/EntityProduction';

import api from './utils/api';

class Poiscaille {
  port = '3000';

  constructor() {
    this.entities = new Map();
    this.items = new Map();
    this.loadedChunk = [];
    this.player = new Player(this);
    this.serverUrl = `${window.location.protocol}//${window.location.host.split(':').shift()}:${this.port}`;
    this.socket = io(this.serverUrl);
    this.api = api(this.socket);
    this.attachSocketListeners();
  }

  initGame() {
    this.initRenderer();
    this.attachUiListeners();
  }

  initRenderer() {
    this.renderer = new Render(this);
    this.renderer.resize();
    this.renderer.loop();
  }

  attachSocketListeners() {
    this.socket.on('cell position', async (cellList) => {
      const unfulfilledCells = [];

      cellList.forEach(({ id, x, y }) => {
        if (!this.entities.has(id)) {
          unfulfilledCells.push(id);
          return;
        }

        const ent = this.entities.get(id);
        ent.x = x;
        ent.y = y;
        ent.z = z;
        ent.updated = true;
      });

      const cells = await this.socket.apiCall('cell info', unfulfilledCells);
      cells.forEach(({
        id, position, state, type,
      }) => {
        this.entities.set(id, this.createCellFromAttributes({ position, state, type }));
      });

      this.entities.forEach((cell, key) => {
        const { updated } = cell;
        cell.updated = false;

        if(!updated) this.entities.delete(key);
      });
    });

    this.socket.on('item info', itemList => {
      itemList.forEach(attrs => {
        const {id} = attrs;

        this.items.set(id, this.createItemFromAttributes(attrs));
      });
    });

    this.socket.on('player nutrient update', (data) => {
      this.player.nutrients = data;
      this.player.updateNutrients();
    });
}

attachUiListeners() {
    const eventTarget = this.renderer.namedCanvas.game.canvas;
    let locked = false;

    eventTarget.addEventListener('mousedown', ({ button }) => {
      if (button === 0) this.player.startSelect();
    });

    eventTarget.addEventListener('mouseup', ({ button }) => {
      if (button === 0) this.player.endSelect();
    });

    eventTarget.addEventListener('contextmenu', (event) => {
      this.player.moveUnitsToPosition();
      event.preventDefault();
    });

    eventTarget.addEventListener('click', () => {
      if(eventTarget.requestPointerLock)
        eventTarget.requestPointerLock();
      else if(eventTarget.mozRequestPointerLock)
        eventTarget.mozRequestPointerLock();

      if(document.documentElement.requestFullscreen)
        document.documentElement.requestFullscreen();
      else if(document.documentElement.mozRequestFullscreen)
        document.documentElement.mozRequestFullscreen();
      else if(document.documentElement.webkitRequestFullscreen)
        document.documentElement.webkitRequestFullscreen();
    });

    const lockHandler = () => {
      locked = (document.pointerLockElement === eventTarget || document.mozPointerLockElement === eventTarget);
    };

    document.addEventListener('pointerlockchange', () => lockHandler());
    document.addEventListener('mozpointerlockchange', () => lockHandler());
    document.addEventListener('mousemove', ({ movementX, movementY, clientX, clientY }) => {
      const sensitivity = 1.3;
      if(locked) {
        this.player.cursor.x += movementX * sensitivity;
        this.player.cursor.y += movementY * sensitivity;
      } else {
        this.player.cursor.x = clientX;
        this.player.cursor.y = clientY;
      }
    });

    window.addEventListener('resize', () => this.renderer.resize());
  }

  /**
   * Creates new cell from provided attributes
   * @param position
   * @param state
   * @param type
   *
   * @returns {EntityCell}
   */
  createCellFromAttributes({ position, state, type }) { // TODO state
    if (type === EntityProducer.TYPE) {
      return new EntityProducer(this, position[0], position[1]);
    } else if (type === EntityProduction.TYPE) {
      return new EntityProduction(this, position[0], position[1]);
    }

    return null;
  }

  createItemFromAttributes({ position, attribute, type }) {
    if(type === EntityNutrient.TYPE) {
      return new EntityNutrient(this, position[0], position[1], attribute);
    } else if (type === EntityDNA.TYPE) {
      return new EntityDNA(this, position[0], position[1], DNA.fromAttribute(attribute));
    }
  }
}

export default Poiscaille;
