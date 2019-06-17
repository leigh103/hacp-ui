<template>
    <div>
        <div class="list-item"
                v-for="(sensor, key) in sensors"
                v-if="sensor"
                :class="{'selected':view.selected_sensor === key}"
        >
            <div class="indicator">
            </div>
            <div class="name" @click.prevent="selectSensor(key)">{{ sensor.name }}</div>
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
        computed: mapState([
            'sensors',
            'view',
        ]),
        methods: {
            selectSensor(key){
                this.$store.dispatch('updateView',{obj:'selected_sensor', val:key})
            }
        },
        mounted () {
            if (Object.keys(this.sensors).length == 0){
                this.$store.dispatch('getEntities','sensors')
            }
        },
    }

</script>

<style lang="stylus">



</style>
