class DNA {
  constructor(dnaId) {
    this.id = dnaId;
    this.cost = 0;
  }

  static fromAttribute(attribute) {
    return new DNA(attribute);
  }
}

export default DNA;
