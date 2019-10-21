<template>

    <div class="row">
        <div class="view-list vh100 overflow-y" :class="{'hidden-s':view.selected_sensor}">
            <switch-list />
        </div>
        <div class="view-page vh100 overflow-y" :class="{'selected-open':view.selected_sensor}">
            <sensor-page v-if="view.selected_sensor"/>

            <div v-else class="text-left" :class="{'hidden-s':!view.selected_sensor}">

                <div class="view-page-header">
                    <h1 class="mb-1 text-blue">Switches</h1>
                    <h4 class="mb-2">You currently have {{ sensor_count }} switches, <span v-show="sensor_count == sensor_live_count">all </span>{{ sensor_live_count }} are online.
                        <span v-show="sensor_battery_count == 1">{{sensor_battery_warn}} has a low battery.</span>
                        <span v-show="sensor_battery_count > 1">{{sensor_battery_count}} switches have low batteries.</span>
                    </h4>
                </div>
                <div class="view-page-footer">
                    <div class="toggle-wrap scroll-horizontal-s">
                        <sensor-info v-for="sid in favorites.sensors" :id="sid"></sensor-info>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'switches',
    data () {
        return {
            favorites: {},
            sensor_count:0, // needs to be 1 to include the daylight sensor
            sensor_live_count:0, // ditto
            sensor_battery_count:0,
            sensor_battery_warn:''
        }
    },
    computed: mapState([
        'view',
        'sensors'
    ]),
    watch: {
        sensors (newProp, oldProp){
            if (Object.keys(this.sensors).length > 0){
                this.getSensorDetails()
            }
        },
    },
    created(){
        this.favorites = localStorage.getItem('favorites')

        if (this.favorites){
            this.favorites = JSON.parse(this.favorites)
        }
    },
    mounted(){
        this.getSensorDetails()
    },
    methods:{

        getSensorDetails(){
            for (var i in this.sensors){

                if (this.sensors[i].type == 'ZHASwitch'){
                    console.log(this.sensors[i].type)
                    this.sensor_count++

                    if (this.sensors[i].config){
                        if (this.sensors[i].config.reachable && this.sensors[i].config.reachable === true){
                            this.sensor_live_count ++
                        }
                        if (this.sensors[i].config.battery && this.sensors[i].config.battery < 20){
                            this.sensor_battery_count ++
                            this.sensor_battery_warn = this.sensors[i].name
                        }
                    }


                }
            }
        }

    }
}
</script>
