<template>
    <div class="popup">

        <div class="popup-content">
            <div class="row">
                <div class="block-50">
                    <h3 class="inline">Set Automation</h3>
                    <p>Set the options below to create your automation</p>
                    </p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn" v-if="!saved" @click.prevent="closePopup()">&times; Cancel</a>
                </div>
            </div>

            <div class="py-3">

                <div class="row">
                    <div class="mb-1">

                        <select v-model="automation_data.action" @change="updateAutomation()">
                            <option value="" disabled>Select an Action...</option>
                            <option value="lights_turn_on">Light Turn On</option>
                            <option value="lights_turn_off">Light Turn Off</option>
                            <option value="lights_toggle">Light Toggle</option>
                            <option value="lights_colorTemp">Light Color Temp</option>
                            <option value="lights_brightness">Light Brightness</option>
                            <option value="groups_turn_on">Group Turn On</option>
                            <option value="groups_turn_off">Group Turn Off</option>
                            <option value="groups_toggle">Group Toggle</option>
                            <option value="groups_colorTemp">Group Color Temp</option>
                            <option value="groups_brightness">Group Brightness</option>
                            <option value="activate_scene">Scene Turn On</option>
                            <option value="play_audio">Play Audio</option>
                        </select>

                    </div>
                    <div class="mb-1" v-if="automation_data.action">

                        <select v-if="match(automation_data.action,'light')" v-model="automation_data.entity_id" @change="updateAutomation()">
                            <option value="" disabled selected>Select a Light...</option>
                            <option v-for="(light, key) in lights" :value="key" v-text="light.name"></option>
                        </select>

                        <select v-if="match(automation_data.action,'group|scene')" v-model="automation_data.entity_id" @change="updateAutomation()">
                            <option value="" disabled selected>Select a Group...</option>
                            <option v-for="(group, key) in groups" :value="key" v-text="group.name"></option>
                        </select>

                        <select v-if="automation_data.action == 'play_audio'" v-model="automation_data.entity_id" @change="updateAutomation()">
                            <option value="" disabled selected>What would you like to play...</option>
                            <option value="sayall">Say a phrase</option>
                            <option value="clipall">Play an audio file through Sonos</option>
                            <option value="playaudio">Play an audio file through HACP</option>
                        </select>

                    </div>

                    <div class="mb-1" v-if="automation_data.action == 'play_audio' && automation_data.entity_id">

                        <input type="text" v-model="automation_data.value" v-if="automation_data.entity_id == 'sayall'" placeholder="Type a phrase..." @change="updateAutomation()">

                        <select v-model="automation_data.value" v-if="automation_data.entity_id == 'clipall' || automation_data.entity_id == 'playaudio'" @change="updateAutomation()">
                            <option value="" disabled selected>Select an audio file...</option>
                            <option value="Doorbell-ringtone.mp3">Large Doorbell</option>
                            <option value="House-bell.mp3">House Doorbell</option>
                            <option value="Christmas-doorbell.mp3">Christmas Doorbell</option>
                            <option value="Notification-1.mp3">Notification 1</option>
                            <option value="Notification-2.mp3">Notification 2</option>
                            <option value="Notification-3.mp3">Notification 3</option>
                            <option value="haunted_mansion.mp3">Haunted Mansion - Welcome</option>
                            <option value="laughing.mp3">Haunted Mansion - Laugh</option>
                            <option value="organ.mp3">Haunted Mansion - Organ</option>
                            <option value="look_alive.mp3">Haunted Mansion - Look Alive</option>
                            <option value="Creaky-door.mp3">Door Creak</option>
                        </select>

                    </div>

                    <div class="mb-1" v-if="match(automation_data.action,'scene') && automation_data.entity_id">

                        <select v-model="automation_data.value" @change="updateAutomation()">
                            <option value="" disabled selected>Select a scene...</option>
                            <option v-for="scene in groups[automation_data.entity_id].scenes" :value="scene.id" v-text="scene.name"></option>
                        </select>

                    </div>

                    <div class="mb-1" v-if="match(automation_data.action,'scene') && automation_data.entity_id">

                        <select v-model="groups[automation_data.entity_id].scenes[automation_data.value-1].transitiontime" @change="updateAutomation()">
                            <option value="" disabled>Scene transition time... (optional)</option>
                            <option v-for="transition in transitions" :value="transition.val" :bind="transition.name"></option>
                        </select>

                    </div>

                    <div class="mb-1" v-if="match(automation_data.action,'turn_on') && automation_data.entity_id" @change="updateAutomation()">

                        <select v-model="automation_data.duration">
                            <option value="" disabled>Turn off after... (optional)</option>
                            <option value="">Always on</option>
                            <option value="1">1 minute</option>
                            <option value="2">2 minutes</option>
                            <option value="3">3 minutes</option>
                            <option value="4">4 minutes</option>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="40">40 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="50">50 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>

                    </div>

                    <div class="mb-1">
                        <a class="btn bg-green text-white" v-if="!saved" @click.prevent="saveAutomation()">Save Automation</a>
                        <a class="btn text-white" v-else @click.prevent="closePopup()">Close</a>
                    </div>

                </div>


            </div>

        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'add-automation',
        data(){
            return {
                msgs:[],
                set_val: false,
                saved: false,
                automation_data:{
                    action:"",
                    entity_id:"",
                    conditions:[],
                    orig_value:"",
                    orig_sensor:"",
                    duration:"",
                    value:"",
                    transitiontime:10
                },
                transitions:[
                    {val:0, name:"No Transition"},
                    {val:100, name:"10 seconds"},
                    {val:200, name:"20 seconds"},
                    {val:300, name:"30 seconds"},
                    {val:400, name:"40 seconds"},
                    {val:500, name:"50 seconds"},
                    {val:600, name:"1 minute"},
                    {val:1200, name:"2 minutes"},
                    {val:1800, name:"3 minutes"},
                    {val:2400, name:"4 minutes"},
                    {val:3000, name:"5 minutes"},
                    {val:6000, name:"10 minutes"},
                    {val:9000, name:"15 minutes"},
                    {val:12000, name:"20 minutes"},
                    {val:18000, name:"30 minutes"},
                    {val:24000, name:"40 minutes"},
                    {val:27000, name:"45 minutes"},
                    {val:30000, name:"50 minutes"},
                    {val:36000, name:"60 minutes"}
                ]
            }
        },
        computed: mapState([
                'automations',
                'lights',
                'groups',
                'sensors',
                'view'
            ]),
        methods: {
            closePopup(){
                localStorage.setItem('automation_key', '')
                localStorage.setItem('automation_sid', '')
                localStorage.setItem('automation_data', '')
                this.$store.dispatch('updateView',{obj:'popup'})
            },
            parseButton(str){

                if (str){
                    str = str+''.split('')

                    let press_type = ''

                    if (str[3] == 3){ // needs further refinement
                        press_type = 'Long Press'
                    } else if (str[3] == 0){
                        press_type = 'Press In'
                    } else if (str[3] == 2){
                        press_type = 'Normal Press'
                    }

                    return 'Button '+str[0]+' '+press_type
                }
            },
            parseTemp(str){
                return (str/100).toFixed(1)
            },
            parseMotion(str){
                if (str === true){
                    return 'Motion Detected'
                } else {
                    return 'No Motion'
                }
            },
            parseDoor(str){
                if (str == 'dtrue'){
                    return 'Door Opened'
                } else {
                    return 'Door Closed'
                }
            },
            match(str,re){
                if (str){
                    re = new RegExp(re)
                    if (str.match(re)){
                        return true
                    }
                }
            },
            updateAutomation(){
                localStorage.setItem('automation_data', JSON.stringify(this.automation_data))
            },
            checkAutomation(){
                return true
            },
            saveAutomation(){

                var new_automation_key = localStorage.getItem('automation_key')
                var new_automation_sid = localStorage.getItem('automation_sid')
                var new_automation_index = localStorage.getItem('automation_index')
                var new_automation_update = localStorage.getItem('automation_update')
console.log(new_automation_update, new_automation_key, new_automation_sid)
                this.automation_data.orig_sensor = new_automation_sid.replace(/^s/,'')
                this.automation_data.orig_value = new_automation_key.replace(/^[svdltp]/,'')

                let new_automation = {}

                if (new_automation_update == 'true'){ // update existing automation
console.log('updating existing',this.automations[new_automation_sid], this.automations[new_automation_sid][new_automation_key])
                    if (new_automation_sid == 'sfalse' && this.automations[new_automation_key]){ // timed automation that already exists

                        this.automation_data.orig_sensor = new_automation_key
                        this.automations[new_automation_key] = this.automation_data
                        new_automation[new_automation_key] = this.automations[new_automation_key]

                    } else if (this.automations[new_automation_sid] && this.automations[new_automation_sid][new_automation_key] && this.automations[new_automation_sid][new_automation_key][new_automation_index]){ //sensor automation that already exists

                        this.automations[new_automation_sid][new_automation_key][new_automation_index] = this.automation_data
                        new_automation[new_automation_sid] = this.automations[new_automation_sid]

                    }

                } else {
console.log('no')
                    if (new_automation_sid == 'sfalse' && this.automations[new_automation_key]){ // timed automation that already exists

                        this.automation_data.orig_sensor = new_automation_key
                        this.automations[new_automation_key].push(this.automation_data)
                        new_automation[new_automation_key] = this.automations[new_automation_key]

                    } else if (new_automation_sid == 'sfalse' && !this.automations[new_automation_key]){ // timed automation that doesn't exists

                        this.automation_data.orig_sensor = new_automation_key
                        this.automations[new_automation_key] = []
                        this.automations[new_automation_key].push(this.automation_data)
                        new_automation[new_automation_key] = this.automations[new_automation_key]

                    } else if (this.automations[new_automation_sid] && this.automations[new_automation_sid][new_automation_key] && this.automations[new_automation_sid][new_automation_key].length>0){ //sensor automation that already exists

                        this.automations[new_automation_sid][new_automation_key].push(this.automation_data)
                        new_automation[new_automation_sid] = this.automations[new_automation_sid]

                    } else if (this.automations[new_automation_sid] && !this.automations[new_automation_sid][new_automation_key]){ // sensor automation where the sensor exists, but doesn't contain anything

                        this.automations[new_automation_sid][new_automation_key] = []
                        this.automations[new_automation_sid][new_automation_key].push(this.automation_data)
                        new_automation[new_automation_sid] = this.automations[new_automation_sid]

                    } else { // new sensor automation

                        new_automation[new_automation_sid] = {}
                        new_automation[new_automation_sid][new_automation_key] = []
                        new_automation[new_automation_sid][new_automation_key].push(this.automation_data)

                    }

                }


                //
                localStorage.setItem('automation_update','false')
console.log(new_automation)
                this.$store.dispatch('hacpCall',{method:'put', url:'automations',data: new_automation})
                    .then(res => {
                        this.$store.dispatch('getEntities','automations')
                        this.saved = true
                    })

            }
        },
        mounted () {

            if (!this.sensors){
                this.$store.dispatch('getEntities','sensors')
            }

            if (!this.lights){
                this.$store.dispatch('getEntities','lights')
            }

            if (!this.groups){
                this.$store.dispatch('getEntities','groups')
            }

            if (!this.automations){
                this.$store.dispatch('getEntities','automations')
            }

            if (localStorage.getItem('automation_data')){
                this.automation_data = JSON.parse(localStorage.getItem('automation_data'))
            }

            // if (this.view.selected_group){
            //     this.automation_data.entity_id = this.view.selected_group
            // }
            // if (this.view.selected_sensor){
            //     this.automation_data.entity_id = this.view.selected_sensor
            // }
            // if (this.view.selected_light){
            //     this.automation_data.entity_id = this.view.selected_light
            // }

        }
    }

</script>
