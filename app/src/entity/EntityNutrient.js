import EntityItem from "./EntityItem";

class EntityNutrient extends EntityItem {
  static TYPE = 'Nutrient';

  constructor(game, x, y, amount) {
    super(game, x, y);
    this.amount = amount;
  }

  doRender(ctx, canvas, renderer) {
    const position = this.renderer.getRealPosition(this);

    if(this.amount < 5) {
      ctx.font = "20px Material Design Icons";
      ctx.fillStyle = '#202020';
    } else {
      ctx.font = "30px Material Design Icons";
      ctx.fillStyle = '#ffc107';
    }

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('\uf5e3', position.x, position.y);
  }
}

export default EntityNutrient;
