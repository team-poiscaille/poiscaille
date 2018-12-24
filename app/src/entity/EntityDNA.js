import EntityItem from './EntityItem';

class EntityDNA extends EntityItem {
  static TYPE = 'DNA';

  constructor(game, x, y, dna) {
    super(game, x, y);
    this.dna = dna;
  }

  doRender(ctx) {
    // TODO
  }
}

export default EntityDNA;
