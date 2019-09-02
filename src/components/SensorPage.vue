<template>
    <div v-if="sensors[this.view.selected_sensor]">

        <div class="text-left">
            <h1 class="text-blue" v-text="sensors[this.view.selected_sensor].name"></h1>
            <h4 class="">This {{sensors[this.view.selected_sensor].type}} provides {{Object.keys(sensors[this.view.selected_sensor].state).length}} points of data. It is <span v-if="sensors[this.view.selected_sensor].config.reachable === true">online, and has {{sensors[this.view.selected_sensor].config.battery}}% battery.</span><span v-else>currently not reachable.</span></h4>

            <div class="mt-2">
                <h3 class="mb-1 text-blue">Sensor Values</h3>
                <div class="underline"></div>
                <sensor-info v-for="(stat, key) in sensors[this.view.selected_sensor].state" :id="view.selected_sensor" :name="key" :val="stat"></sensor-info>
            </div>
            <div class="mt-2">
                <h3 class="mb-1 text-blue">Sensor Config</h3>
                <div class="underline"></div>
                <sensor-info v-for="(stat, key) in sensors[this.view.selected_sensor].config" :id="view.selected_sensor" :name="key" :val="stat"></sensor-info>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="block-50">
                        <h3 class="text-blue inline">Automations</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn add" @click.prevent="openAddAutomation()"><i class="fas fa-plus"></i></a>
                        <a class="btn close ml-1" v-show="view.found_automations > 0" @click.prevent="automations_edit = !automations_edit"><i class="fas fa-times" v-show="automations_edit"></i><i class="fas fa-edit" v-show="!automations_edit"></i></a>
                    </div>
                </div>
                <div class="underline"></div>
                <automations-toggle v-if="!automations_edit" :id="view.selected_sensor" :type="'sensors'"></automations-toggle>
                <automations-table v-if="automations_edit" :id="view.selected_sensor" :type="'sensors'"></automations-table>
            </div>

            <div class="mt-2">
                <div class="row mt-1 text-center border-bottom">
                    <div class="block-50 text-left align-middle pb-1 text-blue">
                        <h4>Settings</h4>
                    </div>
                    <div class="block-50 text-right align-middle">

                    </div>
                </div>
                <div class="row mt-1 mb-1 text-center">
                    <div class="block-50 text-left align-middle">
                        Add to home screen
                    </div>
                    <div class="block-50 text-right align-middle">
                        <input type="checkbox" class="toggle" id="fav"><label @click.prevent="addToHomeScreen('sensors',view.selected_sensor)" for="fav"></label>
                    </div>
                </div>

            </div>



        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import favorites from '../views/favorite.js'

    export default {

        name: 'sensor-page',
        data(){
            return {
                stats:[],
                add_automation: false,
                automations_edit:false
            }
        },
        computed: mapState([
                'sensors',
                'view'
            ]),
        methods: {
            openAddAutomation(){
                this.$store.dispatch('updateView',{obj:'popup', val:'add_automation'})
            }
        },
        created() {
            this.addToHomeScreen = favorites.addToHomeScreen
        },
        mounted () {
            if (!this.sensors || !this.sensors[this.view.selected_sensor]){
                console.log('getting sensor '+this.sensors[this.view.selected_sensor].name)
                this.$store.dispatch('getEntity',{type:'sensors', id:this.view.selected_sensor})
            }
        },

    }

</script>
