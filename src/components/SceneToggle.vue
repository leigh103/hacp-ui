<template>
    <div class="toggle" @click.prevent="toggle()" :class="{'on':groups[gid].action.scene == scene.id && groups[gid].action.on === true}">
        <div class="indicator">
            <div class="led"></div>
        </div>
        <div class="name">{{ scene.name }}</div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['scene','gid'],
        data: function () {
            return {
                //nothing
            }
        },
        computed: mapState([
            'groups'
        ]),
        methods: {
            toggle() {

                let payload = {
                    id:this.gid,
                    scene_id: this.scene.id
                }

                this.$store.dispatch('call',payload)

            }
        },
        mounted(){

        }
    }

</script>

<style lang="stylus">



</style>
