<template>
  <div class="view-page home text-left overflow-y">
    <h1 class="text-blue" v-if="weather && weather.currently">Good {{time.time_of_day}}, it's {{weather.currently.apparentTemperature | temp}}&deg;</h1>
    <h2 v-if="weather && weather.daily">{{weather.daily.summary}}</h2>

    <h2 class="mt-2 mb-1 text-blue">Alarms</h2>
    <div class="scroll-horizontal">
        <div class="list-item selected" @click.prevent="setAlarm(key)" v-for="(alrm, key) in alarm.alarms">
            <div class="indicator"><div class="led" :class="{'on':alarm.armed === true && alarm.key === key,'off': alarm.key != key || alarm.key === false}"></div></div>
            <div class="name">{{ alrm.name }}</div>
        </div>
    </div>


    <div v-if="favorites.groups">
        <h2 class="mt-2 mb-1 text-blue">Groups</h2>
        <div class="scroll-horizontal">
            <group-toggle v-for="gid in favorites.groups" :id="gid"></group-toggle>
        </div>
    </div>

    <div v-if="favorites.sensors">
        <h2 class="mt-2 mb-1 text-blue">Sensors</h2>
        <div class="scroll-horizontal">
            <sensor-info v-for="sid in favorites.sensors" :id="sid"></sensor-info>
        </div>
    </div>

  </div>
</template>

<script>

    import { mapState } from 'vuex'
    import alarm from './alarm.js'

    export default {
        name: 'home',
        data () {
            return {
                favorites: {}
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

            if (this.favorites){
                this.favorites = JSON.parse(this.favorites)
            }

        },
    }

</script>
