<template>
    <div class="home">
        <group-toggle v-bind:group="groups['7']"></group-toggle>
        <light-toggle v-bind:light="lights['11']"></light-toggle>
        <light-toggle v-bind:light="lights['11']"></light-toggle>
        <group-list />
    </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'home',
    computed: mapState([
        'groups',
        'lights'
    ]),
    mounted () {
        this.$store.dispatch('init')
    },
}
</script>
