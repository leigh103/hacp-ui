import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/rooms',
            name: 'rooms',
            component: () => import('./views/Rooms.vue')
        },
        {
            path: '/groups',
            name: 'groups',
            component: () => import('./views/Groups.vue')
        },
        {
            path: '/lights',
            name: 'lights',
            component: () => import('./views/Lights.vue')
        },
        {
            path: '/sensors',
            name: 'sensors',
            component: () => import('./views/Sensors.vue')
        },
        {
            path: '/switches',
            name: 'switches',
            component: () => import('./views/Switches.vue')
        },
        {
            path: '/devices',
            name: 'devices',
            component: () => import('./views/Devices.vue')
        },
        {
            path: '/alarms',
            name: 'alarms',
            component: () => import('./views/Alarms.vue')
        }
    ]
})
