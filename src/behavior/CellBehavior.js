class CellBehavior {
  /**
   * @param {Cell} performer
   */
  constructor(performer) {
    this.performer = performer;
  }

  /**
   * @returns {Cell}
   */
  getPerformer() {
    return this.performer;
  }

  /**
   * @param {Cell} performer
   */
  setPerformer(performer) {
    this.performer = performer;
  }
}

module.exports = CellBehavior;
