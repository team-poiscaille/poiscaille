import {context} from "./Render";

class AnimationMove {
  constructor(renderer, x, y) {
    super(48, renderer);

    this.x = x;
    this.y = y;
  }

  @context('canvas');
  doRender(ctx, canvas, renderer) {
    ctx.fillStyle = '#00bcd4';
    ctx.save();

    const pos = renderer.getRenderPosition(this);

    for(let i = -1; i <= 1; i++) {
      ctx.translate(-pos.x, -pos.y);
      ctx.rotate(i * 120 * renderer.RADIAN);
    }

  }
}

export default Animation;
