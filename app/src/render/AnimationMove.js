import Animation from './Animation';
import { context } from './Render';

class AnimationMove extends Animation {
  constructor(renderer, x, y) {
    super(48, renderer);

    this.x = x;
    this.y = y;
  }

  @context()
  doRender(ctx, canvas, renderer) {
    ctx.strokeStyle = '#00bcd4';
    ctx.strokeWidth = 20;
    ctx.save();

    const pos = renderer.getRenderPosition(this);

    for (let i = -1; i <= 1; i += 1) {
      ctx.translate(-pos.x, -pos.y);
      ctx.rotate(i * 120 * renderer.RADIAN);
      ctx.translate(0, 200 * (1 - this.tick));
      ctx.beginPath();
      ctx.moveTo(-200, -115);
      ctx.lineTo(0, 0);
      ctx.lineTo(200, 115);
      ctx.stroke();
      ctx.restore();
    }
  }
}

export default AnimationMove;
