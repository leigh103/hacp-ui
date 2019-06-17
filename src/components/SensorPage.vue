<template>
    <div v-if="sensors[this.view.selected_sensor]">
        <div class="p-2 text-left">
            <h1 class="" v-text="sensors[this.view.selected_sensor].name"></h1>
            <h4></h4>

            <div class="mt-2">
                <sensor-info v-for="stat in getStats()" :id="view.selected_sensor" :obj="stat"></sensor-info>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'sensor-page',
        data(){
            return {
                stats:[]
            }
        },
        computed: mapState([
            'sensors',
            'view'
        ]),
        methods: {

            getStats(){

                if (this.sensors[this.view.selected_sensor].type == 'Daylight'){
                    this.stats = ['status','daylight','dark']
                } else if (this.sensors[this.view.selected_sensor].type == 'ZHATemperature'){
                    this.stats = ['temperature']
                } else if (this.sensors[this.view.selected_sensor].type == 'ZHAPresence'){
                    this.stats = ['presence']
                } else if (this.sensors[this.view.selected_sensor].type == 'ZHALightLevel'){
                    this.stats = ['lightlevel','lux','daylight','dark']
                }

                return this.stats

            }

        },
        mounted () {
            if (!this.sensors || !this.sensors[this.view.selected_sensor]){
                this.$store.dispatch('getEntity',{type:'sensors', id:this.view.selected_sensor})
            }
        },

    }

</script>
