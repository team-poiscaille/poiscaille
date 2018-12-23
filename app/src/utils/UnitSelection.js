class UnitSelection {
  constructor(game, arr = []) {
    this.units = arr.map(v => game.entities.get(v)).filter(v => v);
  }

  add(entity) {
    this.units.push(entity);
  }

  getType() {
    return this.units.reduce((prev, curr) => {
      if (!prev) return curr.type;
      if (prev !== curr.type) return 'mixed';

      return prev;
    }, null);
  }

  checkDead() {
    this.units = this.units.filter(v => !v.isDead);
  }

  save() {
    return this.units.map(v => v.id);
  }
}

export default UnitSelection;
