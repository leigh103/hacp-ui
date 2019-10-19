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
            selected_group:false,
            selected_sensor:false,
            selected_device:false,
            selected_alarm:false,
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
            } else if (data.reset === true){
                Vue.set(state.view, 'selected_group', false)
                Vue.set(state.view, 'selected_light', false)
                Vue.set(state.view, 'selected_sensor', false)
                Vue.set(state.view, 'selected_alarm', false)
                Vue.set(state.view, 'selected_device', false)
            } else {
                state.view = data
            }

        }
    },
    actions: {

        init ({ commit }) {

        },

        all ({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://10.0.1.100:3000/all')
                    .then(r => {
                        commit('SET_GROUPS', r.data.groups)
                        commit('SET_LIGHTS', r.data.lights)
                        commit('SET_SENSORS', r.data.sensors)
                        commit('SET_WEATHER', r.data.weather)
                        commit('SET_DEVICES', r.data.devices)
                        commit('SET_TIME', r.data.time)
                        commit('SET_ALARM', r.data.alarm)
                        resolve('done');
                    })
                    .catch(() => {
                        let conf = confirm('Error connecting to HACP server')
                        if (conf){
                            window.location.href = '/'
                        }
                    })
            })

        },

        getEntities ({ commit }, type) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://10.0.1.100:3000/'+type)
                    .then(res => {
                        let commit_var = type.toUpperCase()
                        commit('SET_'+commit_var, res.data)
                        resolve(res);
                    })
                    .catch(() => {
                        let conf = confirm('Error connecting to HACP server')
                        if (conf){
                            window.location.href = '/'
                        }
                    })
            })
        },

        getEntity ({ commit }, payload) {
        //    console.log('Getting '+payload.type+' '+payload.id)
            return new Promise((resolve, reject) => {
                axios
                    .get('http://10.0.1.100:3000/'+payload.type+'/'+payload.id)
                    .then(res => {
                        let commit_var = payload.type.toUpperCase()
                        commit('SET_'+commit_var, {id:payload.id, data:res.data})
                        resolve(res);
                    })
                    .catch(() => {
                        let conf = confirm('Error connecting to HACP server')
                        if (conf){
                            window.location.href = '/'
                        }
                    })
            })
        },

        updateView ({ commit }, payload) {
            if (payload.obj){

                if (payload.obj.match(/^selected/) && this.state.view[payload.obj] === payload.val){
                    payload.val = false
                }

                commit('SET_VIEW', {obj:payload.obj, val:payload.val})

                if (payload.obj == 'popup' && payload.val != false){
                    document.getElementsByTagName('body')[0].classList.add("overflow-hidden");
                } else {
                    document.getElementsByTagName('body')[0].classList.remove("overflow-hidden");
                }


            } else {
                commit('SET_VIEW', {reset:true})
            }
        },

        resetView ({ commit }, payload) {

            commit('SET_VIEW', payload)

        },

        call ({ commit }, payload) { // call the Zigbee gateway API

            return new Promise((resolve, reject) => {

                if (!payload.method){
                    payload.method = 'PUT'
                }

                if (payload.effect && payload.effect == 'lightning'){

                    var state,
                        its = 9,
                        last = its-1,
                        ttime = 0;

                    var i = 0;

                    function myLoop () {

                        if (i%2==0){
                            state = 0
                        } else {
                            state = 255
                        }

                       setTimeout(function () {

                           if (i == last){
                               ttime =15
                           }

                           axios({
                               method:payload.method,
                               url:'http://10.0.1.100/api/988112a4e198cc1211/'+payload.url,
                               data:{on: true, bri: state, transitiontime:ttime}
                           }).then(res => {
                               if (i == its){
                                   resolve(res);
                               }

                           })
                           .catch(() => {
                               let conf = confirm('Error connecting to Zigbee server')
                               if (conf){
                                   window.location.href = '/'
                               }
                           })
                          i++;
                          if (i < its) {
                             myLoop();
                          }
                      }, 100)
                    }

                    myLoop();

                } else {

                    axios({
                        method:payload.method,
                        url:'http://10.0.1.100/api/988112a4e198cc1211/'+payload.url,
                        data:payload.data
                    }).then(res => {
                        resolve(res);
                    })
                    .catch(() => {
                        let conf = confirm('Error connecting to Zigbee server')
                        if (conf){
                            window.location.href = '/'
                        }
                    })

                }



            })

        },

        hacpCall ({ commit }, payload) { // call the HACP API

            return new Promise((resolve, reject) => {

                if (payload.data){

                    var axios_payload = {
                        method: payload.method,
                        url:'http://10.0.1.100:3000/'+payload.url,
                        data: payload.data
                    }

                } else {

                    var axios_payload = {
                        method: payload.method,
                        url:'http://10.0.1.100:3000/'+payload.url
                    }

                }

                axios(axios_payload).then(res => {
                    resolve(res);
                }).catch(res => {
                    reject(res);
                })

            })

        },

        playAudio ({commit}, payload){
            if (payload.file) {
                var audio = new Audio(require('./assets/audio/'+payload.file));
                audio.play();
            }

        }

    }
})
