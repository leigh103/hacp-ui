<template>
  <div class="about p-2 text-left overflow-y">
    <h1 v-if="weather">Good {{time.time_of_day}}, it's {{weather.currently.apparentTemperature | temp}}&deg;</h1>
    <h2>{{weather.daily.summary}}</h2>

    <div v-if="fav_groups.length > 0">
        <h2 class="mt-2 mb-1">Groups</h2>
        <div class="scroll-horizontal">
            <group-toggle v-for="(val,gid) in fav_groups" :id="val.gid"></group-toggle>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'home',
    data () {
        return {
            favorites: {},
            fav_groups: []
        }
    },
    computed: mapState([
        'weather',
        'time',
        'groups'
    ]),
    filters: {
        temp (value) {
          return parseInt(value.toFixed(0))
        }
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
        }

    },
}
</script>
