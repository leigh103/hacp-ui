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
        alarm:{},
        automations:{},
        view:{
            selected_group:0,
            selected_sensor:0,
            selected_device:0,
            popup:''
        }
    },
    mutations: {
        SET_GROUPS (state, data) {
            if (data.id){
                Vue.set(state.groups, data.id, data.data)
            } else {
                state.groups = data
            }
        },
        SET_LIGHTS (state, data) {
            if (data.id){
                Vue.set(state.lights, data.id, data.data)
                // state.lights[data.id] = data.data
            } else {
                state.lights = data
            }
        },

        SET_SENSORS (state, data) {
            if (data.id){
                Vue.set(state.sensors, data.id, data.data)
            } else {
                state.sensors = data
            }
        },
        SET_WEATHER (state, weather) {
            state.weather = weather
        },
        SET_DEVICES (state, data) {
            if (data.id){
                Vue.set(state.devices, data.id, data.data)
            } else {
                state.devices = data
            }
        },
        SET_AUTOMATIONS (state, data) {
            if (data.id){
                Vue.set(state.automations, data.id, data.data)
            } else {
                state.automations = data
            }
        },
        SET_TIME (state, time) {
            state.time = time
        },
        SET_ALARM (state, alarm) {
            state.alarm = alarm
        },
        SET_VIEW (state, data) {

            if (data.subval){
                state.view[data.obj][data.val] = data.subval
            } else if (data.obj){
                Vue.set(state.view, data.obj, data.val)
            } else {
                state.view = data
            }

        }
    },
    actions: {

        init ({ commit }) {

        },

        all ({ commit }) {
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

        getEntities ({ commit }, type) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://zigbee.local:3000/'+type)
                    .then(res => {
                        let commit_var = type.toUpperCase()
                        commit('SET_'+commit_var, res.data)
                        resolve(res);
                    })
            })
        },

        getEntity ({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://zigbee.local:3000/'+payload.type+'/'+payload.id)
                    .then(res => {
                        let commit_var = payload.type.toUpperCase()
                        commit('SET_'+commit_var, {id:payload.id, data:res.data})
                        resolve(res);
                    })
            })
        },

        updateView ({ commit }, payload) {
            if (payload.obj){

                commit('SET_VIEW', {obj:payload.obj, val:payload.val})

                if (payload.obj == 'popup' && payload.val != false){
                    document.getElementsByTagName('body')[0].classList.add("overflow-hidden");
                } else {
                    document.getElementsByTagName('body')[0].classList.remove("overflow-hidden");
                }

            } else {
                commit('SET_VIEW', payload)
            }
        },

        call ({ commit }, payload) {

            return new Promise((resolve, reject) => {
                if (payload.scene_id){
                    axios
                        .put('http://10.0.1.100/api/988112a4e198cc1211/groups/'+payload.id+'/scenes/'+payload.scene_id+"/recall")
                        .then(res => {
                            resolve(res);
                        })
                } else {
                    axios
                        .put('http://10.0.1.100/api/988112a4e198cc1211/'+payload.type+'/'+payload.id+'/'+payload.obj, payload.action)
                        .then(() => {
                            resolve(res);
                        })
                }
            })

        },

        hacpCall ({ commit }, payload) {

            return new Promise((resolve, reject) => {
                if (payload.method){
                    axios({
                        method: payload.method,
                        url:'http://10.0.1.100:3000/'+payload.url,
                        data: payload.data
                    }).then(res => {
                        resolve(res);
                    })
                }
            })

        }

    }
})
