const context = (name = 'game') => (target, key, descriptor) => {
  const renderer = target.renderer || target;

  descriptor.value = renderer.context(name, descriptor.value, target);
  return descriptor;
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
      this.renderCursor,
      this.renderMinimap,
    ];
  }

  context(name, f, thisArg) {
    return () => f.call(thisArg, this.namedCanvas[name].ctx, this.namedCanvas[name].canvas, this);
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

  addAnimation(animation) {
    this.animations.push(animation);
  }

  render() {
    this.iterate((ctx, canvas) => {
      ctx.clearRect(canvas.width, canvas.height);
    });

    this.renderPipeline.forEach(f => f.call(this));
  }

  renderAnimations() {
    this.animations = this.animations.filter(anim => anim.render());
  }

  @context()
  renderBackground(ctx, canvas) {
    ctx.fillStyle = '#313131';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  @context()
  renderSpotlight() {

  }

  @context()
  renderGrid(ctx, canvas) {
    const distance = this.GRID_DISTANCE / this.PIXEL_DISTANCE_COEFFICIENT;
    const offsetX = this.x % distance;
    const offsetY = this.y % distance;

    for (let x = offsetX; x < canvas.width; x += distance) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.strokeStyle = '#494747';
      ctx.strokeWidth = 3;
      ctx.stroke();
    }

    for (let y = offsetY; y < canvas.height; y += distance) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.strokeStyle = '#494747';
      ctx.strokeWidth = 3;
      ctx.stroke();
    }
  }

  @context()
  renderCursor() {

  }

  @context()
  renderEntities() {

  }

  @context('minimap')
  renderMinimap() {

  }
}

export default Render;
export { context };
