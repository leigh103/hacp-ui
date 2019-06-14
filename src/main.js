import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style/global.styl'

import GroupToggle from './components/GroupToggle.vue'
import GroupList from './components/GroupList.vue'

import LightToggle from './components/LightToggle.vue'

import SensorList from './components/SensorList.vue'
import SensorInfo from './components/SensorInfo.vue'

import DeviceList from './components/DeviceList.vue'
import DeviceInfo from './components/DeviceInfo.vue'

Vue.config.productionTip = false

Vue.component('group-toggle', GroupToggle);
Vue.component('group-list', GroupList);

Vue.component('light-toggle', LightToggle);

Vue.component('sensor-list', SensorList);
Vue.component('sensor-info', SensorInfo);

Vue.component('device-list', DeviceList);
Vue.component('device-info', DeviceInfo);

Vue.mixin({
    data: function() {
        return {
            settings:{
                gateway:'10.0.1.100',
                gatewayAPIKey: '988112a4e198cc1211',
                hacpPort:'3000'
            }
        }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
