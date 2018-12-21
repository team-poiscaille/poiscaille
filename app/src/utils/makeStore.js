import { Store } from 'vuex';

const syncStore = (object, args) => {
  const mutations = {};
  args.forEach((key) => {
    mutations[key] = (state) => {
      state[key] = object[key];
    };
  });

  return mutations;
};

const updateStore = (...args) => {
  const mutations = {};
  args.forEach((key) => {
    mutations[key] = (state, payload) => {
      state[key] = payload;
    };
  });

  return mutations;
};

export default function makeStore(game) {
  const store = new Store({
    state: {
      phase: 'splash',
      selectedUnits: game.player.selectedUnits,
      nutrients: game.player.nutrients,
      dna: game.player.dnaList,
    },

    mutations: {
      ...updateStore('phase'),
      ...syncStore(game, ['selectedUnits', 'nutrients', 'dna']),
    },
  });

  return store;
}
