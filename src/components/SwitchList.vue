<template>
    <div>
        <div class="list-item"
                v-for="(sensor, key) in sensors"
                v-if="sensor.type == 'ZHASwitch'"
                :class="{'selected':view.selected_sensor === key}"
        >
            <div class="indicator text-white">
                <div class="led" :class="{'off':sensor.config.battery <= 1, 'replace':sensor.config.battery > 1 && sensor.config.battery <= 20, 'warn':sensor.config.battery > 20 && sensor.config.battery <= 30, 'on':sensor.config.battery > 30}">

                </div>
            </div>
            <div class="name text-white" @click.prevent="selectSensor(key)">{{ sensor.name }}</div>
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
                'sensors',
                'view',
            ])
        },
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
