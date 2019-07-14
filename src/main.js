import Vue from 'vue'
import App from './App.vue'
import Ws from './Ws.vue'
import router from './router'
import store from './store'

import './style/framework33.css'
import './style/global.styl'

// Import and register all Single File Components from components folder

const req = require.context('./components/', true, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key).default)
});

// Import and register the WebSocket component

Vue.component('ws', Ws);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
