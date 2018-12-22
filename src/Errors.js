/**
 * @readonly
 * @enum
 */
const Errors = {
  // Invalid data given to the request
  INVALID_ARGUMENTS: 0,
  // Player has no room joined
  PLAYER_NOROOM: 1
};
Object.freeze(Errors);

module.exports = Errors;
