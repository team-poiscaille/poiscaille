const Vector2 = require('./math/Vector2');

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class Utils {
  /**
   * @param {Array.<string>} names
   * @returns {Array.<Dna.Information>}
   */
  static createDnaListFromNames(names) {
    // To do
  }

  static createRandomVector2(minX, minY, maxX, maxY) {
    return new Vector2(
      Utils.getRandomIntInclusive(minX, maxX),
      Utils.getRandomIntInclusive(minY, maxY),
    );
  }

  /**
   * Generates random string with provided length
   *
   * @param {number} length
   * @param {string} charSet
   * @returns {string}
   */
  static getRandomString(length, charSet = DEFAULT_CHARSET) {
    let text = '';

    for (let i = 0; i < length; i += 1) {
      text += charSet.charAt(Utils.getRandomIntInclusive(0, charSet.length));
    }

    return text;
  }

  /**
   * Returns random number min <= x <= max
   * @see {@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random|MDN}
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static validateNumber(value) {
    return typeof value === 'number';
  }

  static validateString(value) {
    return typeof value === 'string';
  }
}

module.exports = Utils;
