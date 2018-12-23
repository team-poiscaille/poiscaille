import Animation from './Animation';
import { context } from './Render';

class AnimationMove extends Animation {
  constructor(renderer, x, y) {
    super(12, renderer);

    this.x = x;
    this.y = y;
  }

  @context()
  doRender(ctx, canvas, renderer) {
    ctx.strokeStyle = '#00bcd4';
    ctx.lineWidth = 10;
    ctx.save();

    const pos = renderer.getRenderPosition(this);

    for (let i = -1; i <= 1; i += 1) {
      ctx.translate(pos.x, pos.y);
      ctx.rotate(i * 120 * renderer.RADIAN);
      ctx.translate(0, 100 * (1 - this.tick / this.duration));
      ctx.beginPath();
      ctx.moveTo(-50, 28);
      ctx.lineTo(0, 0);
      ctx.lineTo(50, 28);
      ctx.stroke();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}

export default AnimationMove;
