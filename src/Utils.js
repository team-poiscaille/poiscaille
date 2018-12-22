const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

class Utils {
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
   * @link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   *
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

  static validateString(vallue) {
    return typeof value === 'string';
  }
}

module.exports = Utils;
