<template>

    <div class="text-left p-2">
        <light-toggle :light="light" :key="key" :id="key" v-for="(light,key) in lights"></light-toggle>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'lights',
    computed: mapState([
        'lights'
    ]),
    mounted () {
        if (Object.keys(this.lights).length == 0){
            this.$store.dispatch('getEntities','lights')
        }
    },
}
</script>

<style>

</style>
