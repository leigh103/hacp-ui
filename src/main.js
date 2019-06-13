import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style/global.styl'

import GroupToggle from './components/GroupToggle.vue'
import GroupList from './components/GroupList.vue'

import LightToggle from './components/LightToggle.vue'

Vue.config.productionTip = false

Vue.component('group-toggle', GroupToggle);
Vue.component('group-list', GroupList);

Vue.component('light-toggle', LightToggle);

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
