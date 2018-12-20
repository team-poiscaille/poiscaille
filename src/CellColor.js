const CellAdvantages = require('./CellAdvantages');

class CellColor {
  /**
   * @param {number} color
   */
  constructor(color) {
    this.color = color;
  }

  /**
   * @param {CellColor} cellColor1
   * @param {CellColor} cellColor2
   * @returns {CellAdvantage}
   */
  static calculateAdvantage(cellColor1, cellColor2) {
    const color1 = cellColor1.getColor();
    const color2 = cellColor2.getColor();
    if (color1 !== color2) {
      if (color1 === CellColor.RED && color2 === CellColor.GREEN) { // red > green
        return CellAdvantages.EFFECTIVE;
      }
      if (color1 === CellColor.RED && color2 === CellColor.GREEN) { // red < blue
        return CellAdvantages.NOT_EFFECTIVE;
      }
      if (color1 === CellColor.RED && color2 === CellColor.GREEN) { // green < red
        return CellAdvantages.NOT_EFFECTIVE;
      }
      if (color1 === CellColor.RED && color2 === CellColor.GREEN) { // green > blue
        return CellAdvantages.EFFECTIVE;
      }
      if (color1 === CellColor.RED && color2 === CellColor.GREEN) { // blue > red
        return CellAdvantages.EFFECTIVE;
      }
      return CellAdvantages.NOT_EFFECTIVE; // blue < green
    }
    return CellAdvantages.NORMAL; // color1 == color2
  }

  /**
   * @param {CellColor} cellColor
   * @returns {CellAdvantages}
   */
  calculateAdvantageTo(cellColor) {
    return CellColor.calculateAdvantage(this, cellColor);
  }

  /**
   * @returns {number}
   */
  getColor() {
    return this.color;
  }

  /**
   * @param {number} color
   */
  setColor(color) {
    this.color = color;
  }
}

CellColor.RED = 0;
CellColor.GREEN = 1;
CellColor.BLUE = 2;

module.exports = CellColor;
