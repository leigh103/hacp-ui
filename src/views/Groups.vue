<template>

    <div class="row">
        <div class="block-20 bg-grey vh100 overflow-y">
            <group-list />
        </div>
        <div class="block-80 bg-white vh100 overflow-y">
            <group-page />
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
    ]),
    mounted () {
        if (Object.keys(this.groups).length == 0){
            this.$store.dispatch('getEntities','groups')
        }
    },
}
</script>
