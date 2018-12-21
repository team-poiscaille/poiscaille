import makeStore from "./src/utils/makeStore";

import App from "./App.vue";
import Poiscaille from "./src/Poiscaille";
import Vue from "vue";
import Vuex from "vuex";

import "./less/index.less";

Vue.use(Vuex);

const game = new Poiscaille();
const store = makeStore(game);

new Vue({
  el: '#app',
  store,
  render(h) {
    return h(App);
  }
});
