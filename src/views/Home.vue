<template>
  <div class="about p-2 text-left overflow-y">
    <h1 class="text-blue" v-if="weather && weather.currently">Good {{time.time_of_day}}, it's {{weather.currently.apparentTemperature | temp}}&deg;</h1>
    <h2 v-if="weather && weather.daily">{{weather.daily.summary}}</h2>

    <h2 class="mt-2 mb-1 text-blue">Alarms</h2>
    <div class="scroll-horizontal">
        <div class="list-item selected" @click.prevent="setAlarm(key)" v-for="(alrm, key) in alarm.alarms">
            <div class="indicator"><div class="led" :class="{'on':alarm.armed === true && alarm.key === key,'off': alarm.key != key || alarm.key === false}"></div></div>
            <div class="name">{{ alrm.name }}</div>
        </div>
    </div>


    <div v-if="fav_groups.length > 0">
        <h2 class="mt-2 mb-1 text-blue">Groups</h2>
        <div class="scroll-horizontal">
            <group-toggle v-for="(val,gid) in fav_groups" :id="val.gid"></group-toggle>
        </div>
    </div>

    <div v-if="fav_sensors.length > 0">
        <h2 class="mt-2 mb-1 text-blue">Sensors</h2>
        <div class="scroll-horizontal">
            <sensor-info v-for="(val,sid) in fav_sensors" :id="val.sid"></sensor-info>
        </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'
import alarm from './alarm.js'

export default {
    name: 'home',
    data () {
        return {
            favorites: {},
            fav_groups: [],
            fav_sensors:[]
        }
    },
    computed: mapState([
        'weather',
        'time',
        'alarm'
    ]),
    filters: {
        temp (value) {
          return parseInt(value.toFixed(0))
        }
    },
    created() {
        this.setAlarm = alarm.setAlarm // now you can call this.foo() (in your functions/template)
    },
    mounted () {
        this.$store.dispatch('all')

        this.favorites = localStorage.getItem('favorites')

        if (this.favorites.length > 0){
            this.favorites = JSON.parse(this.favorites)

            if (this.favorites.selected_group){
                for (let i in this.favorites.selected_group){
                    this.fav_groups.push({gid:i,count:this.favorites.selected_group[i]})
                    this.fav_groups.sort(function(a, b){
                      return a.count < b.count;
                    })
                }
            }

            if (this.favorites.selected_sensor){
                for (let i in this.favorites.selected_sensor){
                    this.fav_sensors.push({sid:i,count:this.favorites.selected_sensor[i]})
                    this.fav_sensors.sort(function(a, b){
                      return a.count < b.count;
                    })
                }
            }

        }

    },
}
</script>
