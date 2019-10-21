<template>
    <div>

        <div class="text-left" v-if="view.selected_alarm == 'new'">
            <div class="row">
                <div class="block-50">
                    <h1 class=""><input type="text" class="no-style" v-model="new_alarm_name" placeholder="New Alarm Name..."></h1>
                    <p>Type a new name for the alarm above and click save</p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn save"@click.prevent="saveNewAlarm()"><i class="fas fa-save"></i></a>
                </div>
            </div>

        </div>

        <div class="text-left" v-if="view.selected_alarm != 'new' && alarm.alarms && alarm.alarms.length>0 && alarm.alarms[view.selected_alarm]">


            <div class="row">
                <div class="block-50">
                    <h1 class="text-blue"><input type="text" class="no-style" v-model="alarm.alarms[view.selected_alarm].name"></h1>
                    <h4><textarea class="no-style" v-model="alarm.alarms[view.selected_alarm].description"></textarea></h4>

                </div>
                <div class="block-50 text-right">
                    <a class="btn save mr-1" v-if="show_save === true" @click.prevent="saveAlarm()"><i class="fas fa-save"></i></a>
                    <span v-if="alarm.alarms[view.selected_alarm].code != '****' && alarm.alarms[view.selected_alarm].sensors.length>0">
                        <a @click.prevent="setAlarm()" v-if="alarm.armed === true && alarm.key == view.selected_alarm || alarm.armed === false" class="btn add"><span v-if="alarm.armed === true || alarm.setting !== false">Disarm</span><span v-else>Set Alarm</span></a>
                    </span>
                </div>
            </div>

            <div class="mt-2">

                <div class="row text-center">
                    <div class="block-100 text-center">
                        <div class="row mt-1 text-center border-bottom">
                            <div class="block-50 text-left align-middle pb-1 text-blue">
                                <h4>Settings</h4>
                            </div>
                            <div class="block-50 text-right align-middle">

                            </div>
                        </div>
                        <div class="row mt-1 mb-1 text-center">
                            <div class="block-50 text-left align-middle">
                                Code
                            </div>
                            <div class="block-50 text-right align-middle">
                                <p class="text-bold"><input type="text" class="no-style text-right" v-model="alarm.alarms[view.selected_alarm].code"></p>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="block-50 text-left align-middle">
                                Email Alert
                            </div>
                            <div class="block-50 text-right align-middle">
                                <input type="checkbox" class="toggle" v-model="alarm.alarms[view.selected_alarm].email" id="email"><label for="email"></label>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="block-50 text-left align-middle">
                                Audible Alert
                            </div>
                            <div class="block-50 text-right align-middle">
                                <input type="checkbox" class="toggle" v-model="alarm.alarms[view.selected_alarm].alert" id="audible"><label for="audible"></label>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="block-50 text-left align-middle">
                                Arming Countdown
                            </div>
                            <div class="block-50 text-right align-middle">
                                <input type="checkbox" class="toggle" v-model="alarm.alarms[view.selected_alarm].countdown" id="countdown"><label for="countdown"></label>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="mt-2">

                <div class="row mb-2">
                    <div class="block-50">
                        <h3 class="inline">Sensors</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn add" @click.prevent="setSensors()"><i class="fas fa-plus"></i></a>
                    </div>
                </div>

                <sensor-info v-for="sensor in alarm.alarms[view.selected_alarm].sensors" :id="sensor"></sensor-info>

            </div>

            <div class="mt-2">

                <div class="row mb-2">
                    <div class="block-50">
                        <h3 class="inline">Cameras</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn add" @click.prevent="addCamera()"><i class="fas fa-plus"></i></a>
                    </div>
                </div>



            </div>

            <div class="p-5">
            </div>

            <div class="mt-2 text-right">
                <a class="btn delete" @click.prevent="deleteAlarm()"><i class="fas fa-times mr-1"></i> Delete Alarm</a>
            </div>

            <div class="p-5">
            </div>

        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'alarm_page',
        data(){
            return {
                new_alarm_name:'',
                show_save: false
            }
        },
        computed: mapState([
            'alarm',
            'view'
        ]),
        methods: {
            setAlarm(){
                this.$store.dispatch('updateView',{obj:'popup', val:'set_alarm'})
            },
            setSensors(){
                this.$store.dispatch('updateView',{obj:'popup', val:'manage_sensors'})
            },
            saveAlarm(){

                let payload = {
                    method:'PUT',
                    url: 'alarm',
                    data:{
                		name: this.alarm.alarms[this.view.selected_alarm].name,
                		code: this.alarm.alarms[this.view.selected_alarm].code,
                		description: this.alarm.alarms[this.view.selected_alarm].description,
                		email: this.alarm.alarms[this.view.selected_alarm].email,
                		alert: this.alarm.alarms[this.view.selected_alarm].alert,
                		sensors: this.alarm.alarms[this.view.selected_alarm].sensors,
                        countdown: this.alarm.alarms[this.view.selected_alarm].countdown,
                		cameras: [{
                			name: "Driveway",
                			image_url: "http://10.0.1.39/tmpfs/auto.jpg",
                			username: "admin",
                			password: "C$Lli303",
                			view_url: "http://3o3mtdevlpmrplgc.myfritz.net:9001/web/mobile.html"
                		}]
                	}
                }

                if (this.view.selected_alarm != "new"){
                    payload.data.key = this.view.selected_alarm
                }

                this.$store.dispatch('hacpCall',payload)
                    .then(res => {
                        this.show_save = false
                    })
            },

            saveNewAlarm(){

                let payload = {
                    method:'PUT',
                    url: 'alarm',
                    data:{
                		name: this.new_alarm_name,
                		code: "****",
                		description: "Tap here to edit the description...",
                		email: false,
                		alert: false,
                		sensors: [],
                		cameras: []
                	}
                }

                this.$store.dispatch('hacpCall',payload)
                    .then(res => {
                        this.$store.dispatch('getEntities','alarm')
                            .then(res2 => {
                                this.$store.dispatch('updateView',{obj:'selected_alarm', val:this.alarm.alarms.length-1})
                            })
                    })
            },

            deleteAlarm(){

                let prompt = confirm('Are you sure you want to delete this alarm?')

                if (prompt){
                    let payload = {
                        method:'POST',
                        url: 'alarm',
                        data:{
                            type:'delete',
                            key: this.view.selected_alarm
                        }
                    }

                    this.$store.dispatch('hacpCall',payload)
                        .then(res => {
                            this.$store.dispatch('getEntities','alarm')
                                .then(res2 => {
                                    this.$store.dispatch('updateView',{obj:'selected_alarm', val:false})
                                })
                        })
                }

            }

        },
        watch: {
            alarm:{
                 handler(val, new_val){

                     if (Object.keys(new_val).length>0){
                         this.show_save = true
                     }

                 },
                 deep: true
              }
        },
        mounted () {

        }

    }

</script>
