<template>
    <div v-if="sensors[this.view.selected_sensor]">

        <div class="p-2 text-left">
            <h1 class="" v-text="sensors[this.view.selected_sensor].name"></h1>
            <h4></h4>

            <div class="mt-2">
                <h3>Sensor Values</h3>
                <div class="underline"></div>
                <sensor-info v-for="(stat, key) in sensors[this.view.selected_sensor].state" :id="view.selected_sensor" :name="key" :val="stat"></sensor-info>
            </div>
            <div class="mt-2">
                <h3>Sensor Config</h3>
                <div class="underline"></div>
                <sensor-info v-for="(stat, key) in sensors[this.view.selected_sensor].config" :id="view.selected_sensor" :name="key" :val="stat"></sensor-info>
            </div>

            <div class="mt-2">
                <h3>Automations</h3>
                <div class="underline"></div>
                <automations-table :id="view.selected_sensor" :type="'sensors'"></automations-table>
            </div>

            <div class="p-5">
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

        },
        mounted () {
            if (!this.sensors || !this.sensors[this.view.selected_sensor]){
                console.log('getting sensor '+this.sensors[this.view.selected_sensor].name)
                this.$store.dispatch('getEntity',{type:'sensors', id:this.view.selected_sensor})
            }
        },

    }

</script>
