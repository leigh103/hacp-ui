<template>
    <div class="popup">

        <div class="popup-content">
            <div class="row">
                <div class="block-50">
                    <h3 class="inline">Manage Sensors</h3>
                    <p>Tap a sensor to add or remove it from the alarm</p>
                    </p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn" @click.prevent="closePopup()">&times; Done</a>
                </div>
            </div>

            <div class="py-3 text-center">

                <div class="toggle text-left"
                    v-for="(sensor, key) in sensors"
                    :class="{'selected':inArray(alarm.alarms[view.selected_alarm].sensors, key),'unselected':!inArray(alarm.alarms[view.selected_alarm].sensors, key)}"
                    @click.prevent="addSensor(key)"
                >
                    <div class="indicator">
                        <div class="led"></div>
                    </div>
                    <div class="name">{{ sensor.name }}</div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'manage-sensors',
        data(){
            return {

            }
        },
        computed: mapState([
                'alarm',
                'sensors',
                'view'
            ]),
        methods: {
            closePopup(){
                this.$store.dispatch('updateView',{obj:'popup'})
            },
            inArray(arr, val){
                if (typeof arr == 'object' && arr.indexOf(val) !== -1){
                    return true
                } else {
                    return false
                }
            },
            addSensor(val){

                if (this.alarm.alarms[this.view.selected_alarm].sensors.indexOf(val) !== -1){
                    this.alarm.alarms[this.view.selected_alarm].sensors.splice(val,1)
                } else {
                    this.alarm.alarms[this.view.selected_alarm].sensors.push(val)
                }

            }
        },
        mounted () {

            this.$store.dispatch('getEntities','sensors')


        }
    }

</script>
