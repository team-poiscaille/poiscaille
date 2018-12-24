import Color from 'color';
import Entity from './Entity';

const colors = [
  '#e91e63',
  '#4caf50',
  '#2196f3',
];

const colorGenerated = colors.map((color) => {
  const colorArray = Color(color).rgb().array();
  return [1, 0.3, 0.2].map(opacity => `rgba(${[...colorArray, opacity].join(',')})`);
});

class EntityCell extends Entity {
  static TYPE = 'Cell';

  static colors = colorGenerated;

  static COLOR_R = 0;

  static COLOR_G = 1;

  static COLOR_B = 2;

  constructor(game, x, y) {
    super(game, x, y);

    this.radius = 70;
    this.color = EntityCell.COLOR_G;
  }

  get colorList() {
    return EntityCell.colors[this.color];
  }

  doRender(ctx, canvas, renderer, pos) {
    const [color10, color03, color02] = this.colorList;
    const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, this.radius);
    gradient.addColorStop(1, color03);
    gradient.addColorStop(0.9, color02);
    gradient.addColorStop(0.75, color10);
    gradient.addColorStop(0.1, color03);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  renderSpotlight() {

  }
}

export default EntityCell;
