<template>
  <div class="about">
    <h1>This is the home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'groups',
    computed: mapState([]),
    mounted () {
        this.$store.dispatch('init')
    },
}
</script>
