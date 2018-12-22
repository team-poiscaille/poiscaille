const AttackBehavior = require('./entity/behavior/AttackBehavior');
const CellBehavior = require('./entity/behavior/CellBehavior');
const CollectBehavior = require('./entity/behavior/CollectBehavior');
const CompoundAttackBehavior = require('./entity/behavior/CompoundAttackBehavior');
const MeleeAttackBehavior = require('./entity/behavior/MeleeAttackBehavior');
const MoveBehavior = require('./entity/behavior/MoveBehavior');
const ProduceBehavior = require('./entity/behavior/ProduceBehavior');
const RangedAttackBehavior = require('./entity/behavior/RangedAttackBehavior');
const Cell = require('./entity/Cell');
const Entity = require('./entity/Entity');
const Item = require('./entity/Item');
const Nutrient = require('./entity/Nutrient');
const ProducerCell = require('./entity/ProducerCell');
const ProductionCell = require('./entity/ProductionCell');
const Vector2 = require('./math/Vector2');
const Config = require('./Config');
const Player = require('./Player');
const Room = require('./Room');
const Server = require('./Server');
const Utils = require('./Utils');
const World = require('./World');

module.exports = {
  entity: {
    behavior: {
      AttackBehavior,
      CellBehavior,
      CollectBehavior,
      CompoundAttackBehavior,
      MeleeAttackBehavior,
      MoveBehavior,
      ProduceBehavior,
      RangedAttackBehavior,
    },
    Cell,
    Entity,
    Item,
    Nutrient,
    ProducerCell,
    ProductionCell,
  },
  math: {
    Vector2,
  },
  Config,
  Player,
  Room,
  Server,
  Utils,
  World,
};
