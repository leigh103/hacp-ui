import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        groups:{},
        lights:{},
        sensors:{},
        weather:{},
        devices:{},
        time:{},
        alarm:{}
    },
    mutations: {
        SET_GROUPS (state, groups) {
            state.groups = groups
        },
        SET_GROUP (state, data) {
            // TODO needs to be set by the ws connection
            state.groups[data.id][data.obj] = Object.assign(state.groups[data.id][data.obj], data.action)
        },
        SET_LIGHTS (state, lights) {
            state.lights = lights
        },
        SET_LIGHT (state, data) {
            // TODO needs to be set by the ws connection
            state.lights[data.id][data.obj] = Object.assign(state.lights[data.id][data.obj], data.action)
        },
        SET_SENSORS (state, sensors) {
            state.sensors = sensors
        },
        SET_WEATHER (state, weather) {
            state.weather = weather
        },
        SET_DEVICES (state, devices) {
            state.devices = devices
        },
        SET_TIME (state, time) {
            state.time = time
        },
        SET_ALARM (state, alarm) {
            state.alarm = alarm
        }
    },
    actions: {

        init ({ commit }) {
            axios
                .get('http://zigbee.local:3000/all')
                .then(r => {
                    commit('SET_GROUPS', r.data.groups)
                    commit('SET_LIGHTS', r.data.lights)
                    commit('SET_SENSORS', r.data.sensors)
                    commit('SET_WEATHER', r.data.weather)
                    commit('SET_DEVICES', r.data.devices)
                    commit('SET_TIME', r.data.time)
                    commit('SET_ALARM', r.data.alarm)
                })

        },

        getGroups ({ commit }) {
            axios
                .get('http://zigbee.local:3000/groups')
                .then(r => r.data)
                .then(groups => {
                //    console.log(groups)
                    commit('SET_GROUPS', groups)
                })
        },

        call ({ commit }, payload) {
            console.log(payload.type, payload.id, payload.action)
            axios
                .put('http://10.0.1.100/api/988112a4e198cc1211/'+payload.type+'/'+payload.id+'/'+payload.obj, payload.action)
                .then(r => {
                    if (payload.type == 'lights'){
                        commit('SET_LIGHT', payload)
                    } else if (payload.type == 'groups'){
                        commit('SET_GROUP', payload)
                    }

                })
        }

    }
})
