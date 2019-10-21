<template>
  <div class="view-page home text-left overflow-y">

    <div class="view-page-header">
        <h1 class="text-blue" v-if="weather && weather.currently">Good {{time.time_of_day}}, it's {{weather.currently.apparentTemperature | temp}}&deg;</h1>
        <h2 v-if="weather && weather.daily">{{weather.daily.summary}}</h2>
    </div>
    <div class="view-page-footer">
        <div class="toggle-wrap scroll-horizontal">
            <div class="toggle selected" @click.prevent="setAlarm(key)" v-for="(alrm, key) in alarm.alarms">
                <div class="indicator"><div class="led" :class="{'on':alarm.armed === true && alarm.key === key,'off': alarm.key != key || alarm.key === false}"></div></div>
                <div class="name">{{ alrm.name }}</div>
            </div>
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
            .then(res => {
                this.favorites = localStorage.getItem('favorites')

                if (this.favorites){
                    this.favorites = JSON.parse(this.favorites)
                }
            })

        },
    }

</script>
