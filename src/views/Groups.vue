<template>

    <div class="row">
        <div class="block-20 bg-grey vh100 overflow-y">
            <group-list :group="group" :id="key" v-for="(group, key) in groups"></group-list>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'groups',
    computed: mapState([
        'groups',
        'lights'
    ]),
    mounted () {
        if (Object.keys(this.groups).length == 0){
            this.$store.dispatch('getEntities','groups')
        }
    },
}
</script>
