<template>
  <div class="view-page home text-left overflow-y">

    <div class="view-page-header">
        <h1 class="text-blue" v-if="weather && weather.currently">Good {{time.time_of_day}}, it's {{weather.currently.apparentTemperature | temp}}&deg;</h1>
        <h2 v-if="weather && weather.daily">{{weather.daily.summary}}</h2>
    </div>
    <div class="view-page-footer">
        <div class="toggle-wrap scroll-horizontal-s" v-if="home_screen && home_screen.groups">
            <group-toggle v-for="gid in home_screen.groups" :id="gid"></group-toggle>
            <sensor-info v-for="sid in home_screen.sensors" :id="sid"></sensor-info>
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
                home_screen:{}
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
            .then(res => {

                this.home_screen = localStorage.getItem('home_screen')

                if (this.home_screen){
                    this.home_screen = JSON.parse(this.home_screen)
                }
            })

        },
    }

</script>
