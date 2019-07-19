<template>
    <div>
        <div class="list-item"
                v-for="(sensor, key) in sensors"
                v-if="sensor.type != 'ZHASwitch'"
                :class="{'selected':view.selected_sensor === key}"
        >
            <div class="indicator">
                <div class="led"
                    :class="{
                        'off':!sensor.config.on,
                        'replace':sensor.config.on && sensor.config.battery > 1 && sensor.config.battery <= 20,
                        'warn':sensor.config.on && sensor.config.battery > 20 && sensor.config.battery <= 30 || !sensor.config.battery && !sensor.config.configured,
                        'on':sensor.config.on && sensor.config.battery > 30 || !sensor.config.battery && sensor.config.on
                    }
                ">

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
            },
            getMainStat(sensor){

                if (sensor.type == 'ZHATemperature'){
                    return (sensor.state.temperature/100).toFixed(0)+'&deg;C'
                } else if (sensor.type == 'ZHALightLevel'){
                    return sensor.state.lux
                } else if (sensor.type == 'ZHAPresence'){
                    if (sensor.state.presence === true){
                        return '<div class="led on"></div>'
                    } else {
                        return '<div class="led off"></div>'
                    }
                } else if (sensor.type == 'ZHAOpenClose'){
                    if (sensor.state.open === true){
                        return '<div class="led on"></div>'
                    } else {
                        return '<div class="led off"></div>'
                    }
                } else if (sensor.type == 'Daylight'){
                    return sensor.state.status
                }

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
