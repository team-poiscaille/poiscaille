import EntityItem from './EntityItem';

class EntityDNA extends EntityItem {
  type = 'DNA';

  constructor(x, y, dna) {
    super(x, y);
    this.dna = dna;
  }

  doRender(ctx) {
    ctx.drawImage(); // TODO
  }
}

export default EntityDNA;
