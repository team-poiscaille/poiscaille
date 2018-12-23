import cursor from "../../images/Cursor.svg";

const context = (name = 'game') => (decorator) => {
  const oldFunction = decorator.descriptor.value;

  decorator.descriptor.value = function () {
    const thisArg = this;
    const renderer = thisArg.renderer || thisArg;

    renderer.context(name, oldFunction, thisArg);
  };
  return decorator;
};

class Render {
  GRID_DISTANCE = 200;

  PIXEL_DISTANCE_COEFFICIENT = 1;

  RADIAN = Math.PI / 180;

  constructor(game, canvas = ['game', 'minimap']) {
    this.animations = [];
    this.game = game;
    this.namedCanvas = {};
    this.x = 0;
    this.y = 0;

    canvas.forEach((name) => {
      this.namedCanvas[name] = {
        canvas: document.querySelector(`#${name}`),
      };

      this.namedCanvas[name].ctx = this.namedCanvas[name].canvas.getContext('2d');
    });

    this.renderPipeline = [
      this.renderBackground,
      this.renderEntities,
      this.renderAnimations,
      this.renderSelection,
      this.renderCursor,
      this.renderMinimap,
    ];

    this.resources = {};
    this.getResources();
  }

  getImage(src) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = src;
    });
  }

  async getResources() {
    this.resources.cursor = await this.getImage(cursor);
  }

  context(name, f, thisArg) {
    return f.call(thisArg, this.namedCanvas[name].ctx, this.namedCanvas[name].canvas, this);
  }

  iterate(f) {
    Object.keys(this.namedCanvas).forEach((k) => {
      const { ctx, canvas } = this.namedCanvas[k];
      f(ctx, canvas);
    });
  }

  resize() {
    this.iterate((ctx, canvas) => {
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    });
  }

  getRenderPosition(position) {
    return {
      x: (position.x - this.x) * this.PIXEL_DISTANCE_COEFFICIENT,
      y: (position.y - this.y) * this.PIXEL_DISTANCE_COEFFICIENT,
    };
  }

  getRealPosition(position) {
    return {
      x: (position.x + this.x) / this.PIXEL_DISTANCE_COEFFICIENT,
      y: (position.y + this.y) / this.PIXEL_DISTANCE_COEFFICIENT,
    };
  }

  addAnimation(animation) {
    this.animations.push(animation);
  }

  render() {
    this.iterate((ctx, canvas) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    this.renderPipeline.forEach(f => f.call(this));
  }

  renderAnimations() {
    this.animations = this.animations.filter(anim => anim.render());
  }

  @context()
  renderBackground(ctx, canvas) {
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const distance = this.GRID_DISTANCE / this.PIXEL_DISTANCE_COEFFICIENT;
    const offsetX = this.x % distance;
    const offsetY = this.y % distance;

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    for (let x = offsetX; x < canvas.width; x += distance) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = offsetY; y < canvas.height; y += distance) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  @context()
  renderSelection(ctx) {
    if (this.game.player.selectStart) {
      const renderStart = this.game.renderer.getRenderPosition(this.game.player.selectStart);
      const current = this.game.player.cursor;

      const minX = Math.min(current.x, renderStart.x);
      const minY = Math.min(current.y, renderStart.y);
      const maxX = Math.max(current.x, renderStart.x);
      const maxY = Math.max(current.y, renderStart.y);

      ctx.fillStyle = 'rgba(0, 188, 212, 0.3)';
      ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
    }

    this.game.player.selectedUnits.units.forEach((unit) => {
      // TODO change with another icon about selected
      ctx.fillRect(unit.x, unit.y, 5, 5);
    });
  }

  @context()
  renderCursor(ctx) {
    if(!this.resources.cursor) return;

    ctx.drawImage(this.resources.cursor, this.game.player.cursor.x, this.game.player.cursor.y);
  }

  @context()
  renderEntities() {
    this.game.items.forEach(i => {
      i.render();
    });

    this.game.entities.forEach(e => {
      e.render();
    });
  }

  @context('minimap')
  renderMinimap(ctx, canvas) {
    ctx.fillStyle = '#3A3A3A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gap = canvas.width / 7;

    ctx.strokeStyle = '#505050';
    ctx.lineWidth = 1;

    for (let x = gap / 2; x < canvas.width; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = gap / 2; y < canvas.height; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }

  loop() {
    const loopRender = () => {
      this.render();
      requestAnimationFrame(loopRender);
    };

    loopRender();
  }
}

export default Render;
export { context };
