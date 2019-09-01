<template>
  <div class="about p-2 text-left">
    <h1 v-if="weather.currently.apparentTemperature">Good {{time.time_of_day}}, it's {{weather.currently.apparentTemperature | temp}}&deg;</h1>
    <h2>{{weather.daily.summary}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'home',
    computed: mapState([
        'weather',
        'time'
    ]),
    filters: {
        temp (value) {
          return parseInt(value.toFixed(0))
        }
    },
    mounted () {
        this.$store.dispatch('all')
    },
}
</script>
