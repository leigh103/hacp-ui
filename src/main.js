import Vue from 'vue'
import App from './App.vue'
import Ws from './Ws.vue'
import router from './router'
import store from './store'
import Socket from "./socket"

import './style/framework33.css'
import './style/global.styl'

// HACP Single File Components

import GroupToggle from './components/GroupToggle.vue'
import GroupList from './components/GroupList.vue'
import GroupPage from './components/GroupPage.vue'

import LightToggle from './components/LightToggle.vue'

import SensorList from './components/SensorList.vue'
import SensorInfo from './components/SensorInfo.vue'

import DeviceList from './components/DeviceList.vue'
import DeviceInfo from './components/DeviceInfo.vue'

Vue.component('group-toggle', GroupToggle);
Vue.component('group-list', GroupList);
Vue.component('group-page', GroupPage);

Vue.component('light-toggle', LightToggle);

Vue.component('sensor-list', SensorList);
Vue.component('sensor-info', SensorInfo);

Vue.component('device-list', DeviceList);
Vue.component('device-info', DeviceInfo);

Vue.component('ws', Ws);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
