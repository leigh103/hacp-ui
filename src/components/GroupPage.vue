<template>
    <div>
        {{ groups[view.selected_group] }}
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'groups',
        computed: mapState([
            'groups',
            'view'
        ]),
        mounted () {
            // if (Object.keys(this.groups).length == 0){
            //     this.$store.dispatch('getEntities','groups')
            // }
        },

    }


</script>
