import Color from "color";
import Entity from "./Entity";

class EntityCell extends Entity {
  type = 'EntityCell';

  constructor(game, x, y) {
    super(game, x, y);

    this.colorArray = [255, 255, 255];
    this.radius = 70;
  }

  set color(string) {
    this.colorArray = Color(string).rgb().array();
  }

  doRender(ctx, canvas, renderer) {
    const pos = renderer.getRenderPosition(this);
    const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, this.radius);
    gradient.addColorStop(1, `rgba(${[...this.colorArray, 0.3].join(',')})`);
    gradient.addColorStop(0.9, `rgba(${[...this.colorArray, 0.2].join(',')})`);
    gradient.addColorStop(0.75, `rgba(${[...this.colorArray, 1].join(',')})`);
    gradient.addColorStop(0.1, `rgba(${[...this.colorArray, 0.3].join(',')})`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default EntityCell;
