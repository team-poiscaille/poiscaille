/**
 * @readonly
 * @enum
 */
const Config = {
  CELL_NUTRIENTS: 10,
  PLAYERS_PER_ROOM: 1,
  RENDER_MAX_DISTANCE: 16,

  DEFAULT_NUTRIENT_CREATION: 50,
  MIN_NUTRIENT_AMOUNT: 1,
  MAX_NUTRIENT_AMOUNT: 5,
};

Object.freeze(Config);

module.exports = Config;
