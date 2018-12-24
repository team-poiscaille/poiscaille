import { context } from '../render/Render';

class Entity {
  static TYPE = 'Entity';

  constructor(game, x, y) {
    this.id = null;
    this.game = game;
    this.isDead = false;

    this.x = x;
    this.y = y;

    this.renderDistance = 100;
  }

  @context()
  render(ctx, canvas, renderer) {
    const renderPosition = this.renderer.getRenderPosition(this);
    if (!this.renderer.isInRenderDistance(renderPosition, this.renderDistance)) return;

    this.doRender(ctx, canvas, renderer, renderPosition);
  }

  doRender() {}

  get renderer() {
    return this.game.renderer;
  }
}

export default Entity;
