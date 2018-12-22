const context = (name = 'game') => (target, key, descriptor) => {
  const renderer = target.renderer || target;

  descriptor.value = renderer.context(name, descriptor.value, target);
  return descriptor;
};

class Render {
  RADIAN = Math.PI / 180

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
      x: position.x - this.x,
      y: position.y - this.y,
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
  renderBackground() {

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
