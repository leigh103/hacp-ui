<template>
    <div v-if="sensors[this.view.selected_sensor]">

        <div class="text-left pb-5">

            <div class="float-left mr-1" @click.prevent="view.selected_sensor = ''" style="margin-top: 2px"><h2><i class="fas fa-chevron-left text-blue"></i></h2></div>

            <h1 class="text-blue clickable" @click.prevent="resetView()" v-text="sensors[this.view.selected_sensor].name"></h1>
            <h4 class="">This {{sensors[this.view.selected_sensor].type}} provides {{Object.keys(sensors[this.view.selected_sensor].state).length}} points of data. It is <span v-if="sensors[this.view.selected_sensor].config.reachable === true">online, and has {{sensors[this.view.selected_sensor].config.battery}}% battery.</span><span v-else>currently not reachable.</span></h4>

            <div class="mt-2">
                <h3 class="mb-1 text-blue">Sensor Values</h3>
                <div class="mb-1"></div>
                <div class="toggle-wrap scroll-horizontal-s">
                    <sensor-info v-for="(stat, key) in sensors[this.view.selected_sensor].state" :id="view.selected_sensor" :name="key" :val="stat"></sensor-info>
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="block-50">
                        <h3 class="text-blue inline">Automations</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn add" @click.prevent="openAddAutomation()"><i class="fas fa-plus"></i></a>
                    </div>
                </div>
                <div class="mb-1"></div>
                <automations-toggle v-if="!automations_edit" :id="view.selected_sensor" :type="'sensors'"></automations-toggle>

            </div>

            <div class="mt-2">
                <h3 class="mb-1 text-blue">Sensor Config</h3>
                <div class="mb-1"></div>
                <sensor-info-list v-for="(stat, key) in sensors[this.view.selected_sensor].config" :id="view.selected_sensor" :name="key" :val="stat"></sensor-info-list>

            </div>

            <div class="mt-2 pb-5">
                <div class="row mt-1 text-center">
                    <div class="block-50 text-left align-middle pb-1 text-blue">
                        <h4>Settings</h4>
                    </div>
                    <div class="block-50 text-right align-middle">

                    </div>
                </div>
                <div class="row mt-1 mb-1 ml-3 text-center">
                    <div class="block-50 text-left align-middle">
                        Add to favorites
                    </div>
                    <div class="block-50 text-left align-middle">
                        <input type="checkbox" class="toggle" id="fav"><label @click.prevent="addToHomeScreen('sensors',view.selected_sensor)" for="fav"></label>
                    </div>
                </div>
                <div class="row mt-1 mb-1 ml-3 text-center">
                    <div class="block-50 text-left align-middle">
                        Add to home screen
                    </div>
                    <div class="block-50 text-left text-right-s align-middle">
                        <input type="checkbox" class="toggle" id="home"><label @click.prevent="addToHomeScreen('sensors',view.selected_sensor)" for="fav"></label>
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
        watch: {
            view: {
                handler: function(newValue,oldValue) {
                    this.chkFavorites()
                },
                deep: true
            }
        },
        methods: {
            resetView(){
                this.$store.dispatch('resetView',{val:false})
            },
            openAddAutomation(){

                localStorage.removeItem('automation_key');
                localStorage.removeItem('automation_index');
                localStorage.removeItem('automation_update')
                localStorage.removeItem('automation_data');

                localStorage.setItem('automation_sid','s'+this.view.selected_sensor);
                localStorage.setItem('trigger_type','sensor')
                this.$store.dispatch('updateView',{obj:'popup', val:'add_automation'})
            },
            chkFavorites(){
                if (localStorage.getItem('favorites')){
                    var count_data = JSON.parse(localStorage.getItem('favorites'))

                    if (count_data.sensors && count_data.sensors.indexOf(this.view.selected_sensor) >= 0){
                        document.getElementById('fav').checked = true
                    } else {
                        document.getElementById('fav').checked = false
                    }
                }
                if (localStorage.getItem('home_screen')){
                    var count_data = JSON.parse(localStorage.getItem('home_screen'))

                    if (count_data.sensors && count_data.sensors.indexOf(this.view.selected_sensor) >= 0){
                        document.getElementById('home').checked = true
                    } else {
                        document.getElementById('home').checked = false
                    }

                }
            }
        },
        created() {
            this.addToFavorites = favorites.addToFavorites
            this.addToHomeScreen = favorites.addToHomeScreen
        },
        mounted () {
            if (!this.sensors || !this.sensors[this.view.selected_sensor]){
                console.log('getting sensor '+this.sensors[this.view.selected_sensor].name)
                this.$store.dispatch('getEntity',{type:'sensors', id:this.view.selected_sensor})
            }

            this.chkFavorites()

        },

    }

</script>
