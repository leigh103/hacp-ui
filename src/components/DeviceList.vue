<template>
    <div>
        <div class="list-item"
                v-for="(device, key) in devices"
                :class="{'selected':view.selected_device === key || !view.selected_device}"
        >
            <div class="indicator">
                <div class="led">

                </div>
            </div>
            <div class="name text-white" @click.prevent="selectDevice(key)">{{ device.name }}</div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        data: function () {
            return {

            }
        },
        computed: {
            ...mapState([
                'devices',
                'view',
            ])
        },
        methods: {
            selectDevice(key){
                this.$store.dispatch('updateView',{obj:'selected_device', val:key})
            },

        },
        mounted () {
        //    if (Object.keys(this.sensors).length == 0){
                this.$store.dispatch('getEntities','devices')
        //    }
        },
    }

</script>

<style lang="stylus">



</style>
