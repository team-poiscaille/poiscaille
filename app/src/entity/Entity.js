import { context } from '../render/Render';

class Entity {
  constructor(game) {
    // To keep variable names
    this.game = game;
    this.id = null;
    this.isDead = false;
    this.type = null;

    this.x = 0;
    this.y = 0;
  }

  @context()
  render(ctx, canvas, renderer) {
    this.doRender(ctx, canvas, renderer);
  }

  doRender() {}
}

export default Entity;
