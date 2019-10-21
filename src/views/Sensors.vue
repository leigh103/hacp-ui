<template>

    <div class="row">
        <div class="view-list vh100 overflow-y" :class="{'hidden-s':view.selected_sensor}">
            <sensor-list />
        </div>
        <div class="view-page vh100 overflow-y">

            <sensor-page v-if="view.selected_sensor"/>

            <div v-else-if="favorites && favorites.sensors" class="text-left">
                <h1 class="mb-1 text-blue">Sensors</h1>
                <div class="toggle-wrap scroll-horizontal-s">
                    <sensor-info v-for="sid in favorites.sensors" :id="sid"></sensor-info>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'sensors',
    data () {
        return {
            favorites: {}
        }
    },
    computed: mapState([
        'view'
    ]),
    mounted(){
        this.favorites = localStorage.getItem('favorites')

        if (this.favorites){
            this.favorites = JSON.parse(this.favorites)
        }
    }
}
</script>
