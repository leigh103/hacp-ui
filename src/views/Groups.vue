<template>

    <div class="row">
        <div class="view-list vh100 overflow-y" :class="{'hidden-s':view.selected_group}">
            <group-list />
        </div>
        <div class="view-page vh100 overflow-y">
            <group-page v-if="view.selected_group"/>
            <div v-else-if="favorites && favorites.groups" class="text-left">
                <h1 class="mb-1 text-blue">Groups</h1>
                <div class="toggle-wrap scroll-horizontal-s">
                    <group-toggle v-for="gid in favorites.groups" :id="gid"></group-toggle>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'groups',
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
