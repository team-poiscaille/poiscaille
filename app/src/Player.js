import UnitSelection from './utils/UnitSelection';

class Player {
  constructor(game) {
    this.game = game;
    this.selectedUnits = null;
    this.nutrients = 0;
    this.dnas = {};

    this.clearSelections();
  }

  addNutrients(amount) {
    this.nutrients += Math.max(0, amount);
    this.updateNutrients();
  }

  subtractNutrients(amount) {
    this.nutrients -= Math.max(0, amount);
    this.updateNutrients();
  }

  updateNutrients() {
    this.game.store.commit('nutrients');
  }

  findDNA(dna) {
    this.dnas[dna.id] = dna;
    this.game.store.commit('dnaList');
  }

  clearSelections() {
    this.selectedUnits = new UnitSelection(this.game);
  }

  get dnaList() {
    return Object.keys(this.dnas).map(k => this.dnas[k]);
  }
}

export default Player;
