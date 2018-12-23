/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';
import Poiscaille from './src/Poiscaille';

import makeStore from './src/utils/makeStore';

import './less/index.less';

Vue.use(Vuex);

const game = new Poiscaille();
const store = makeStore(game);

Vue.prototype.$game = game;
Vue.prototype.$socket = game.socket;

new Vue({
  el: '#app',
  store,
  render(h) {
    return h(App);
  },
});

if((process.env.NODE_ENV || 'development') === 'development') {
  game.socket.once('room match made', () => {
    store.commit('phase', 'game');
  });
  game.socket.apiCall('init', {username: 'asdf'}).then(id => {
    game.username = 'asdf';
    game.player.id = id;
    game.socket.apiCall('player match');
  });
}
