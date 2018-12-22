import { context } from '../render/Render';

class Entity {
  type = 'Entity';

  constructor(game, x, y) {
    this.id = null;
    this.game = game;
    this.isDead = false;

    this.x = x;
    this.y = y;
  }

  @context()
  render(ctx, canvas, renderer) {
    this.doRender(ctx, canvas, renderer);
  }

  doRender() {}
}

export default Entity;
