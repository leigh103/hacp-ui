<template>
    <div class="popup">

        <div class="popup-content">

            <div class="row" v-if="trigger_type == 'timer'">
                <div class="block-50">
                    <h3 class="inline">Add a Timed Automation</h3>
                    <p>Specify a time to trigger your automation</p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn close" @click.prevent="closePopup()"><i class="fas fa-times"></i></a>
                </div>
            </div>


            <div class="row" v-else-if="trigger_type == 'sensor'">
                <div class="block-50">
                    <h3 class="inline">Add Automation</h3>
                    <p>Activate the <span class="capitalise">{{sensors[view.selected_sensor].name}}</span> sensor by
                        <span v-show="sensors[view.selected_sensor].type == 'ZHASwitch'"> pressing a button</span>
                        <span v-show="sensors[view.selected_sensor].type == 'ZHAPresence'"> moving infront of it</span>
                        <span v-show="sensors[view.selected_sensor].type == 'ZHATemperature'"> waiting for the correct temperature</span>
                        <span v-show="sensors[view.selected_sensor].type == 'ZHAOpenClose'"> opening or closing the door or window</span>.
                        Alternatively, you can specify a value for this sensor to create an automation, by tapping Enter Value
                    </p>
                </div>

                <div class="block-50 text-right">
                    <a @click.prevent="set_val = !set_val" class="btn bg-light-grey mr-1"><span v-show="!set_val"><i class="fas fa-edit"></i></span><span v-show="set_val"><i class="fas fa-list-alt"></i></span></a>
                    <a class="btn close" @click.prevent="closePopup()"><i class="fas fa-times"></i></a>
                </div>

            </div>

            <div v-show="!set_val" class="py-3">
                <div v-for="msg in msgs">

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.buttonevent">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseButton(msg.state.buttonevent)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation('v'+msg.state.buttonevent)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.temperature">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseTemp(msg.state.temperature)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation('t'+msg.state.temperature)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.presence">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseMotion(msg.state.presence)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation('p'+msg.state.presence)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.open">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseDoor(msg.state.open)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation('d'+msg.state.open)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                </div>
                <i class="fas fa-circle-notch spinner" v-show="msgs.length == 0"></i>
            </div>
            <div v-show="set_val" class="py-3">

                <div class="table-item" v-if="set_val == 'time'">
                    <div class="row">
                        <div class="block-50">
                            <select v-model="set_hours">
                                <option value="" disabled selected>Hour...</option>
                                <option v-for="hour in hours" :value="hour">
                                {{ hour }}
                                </option>
                            </select>
                        </div>
                        <div class="block-50">
                            <select v-model="set_mins" placeholder="Mins">
                                <option value="" disabled selected>Mins...</option>
                                <option v-for="min in mins" :value="min">
                                {{ min }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="">
                        <a class="btn" v-show="set_hours && set_mins" @click.prevent="setAutomation(set_hours+''+set_mins)">Use <i class="fas fa-chevron-right"></i></a>
                    </div>
                </div>

                <div class="table-item" v-if="set_val == 'time'">
                    <div>
                        <select v-model="set_event">
                            <option value="" disabled selected>Select an Event...</option>
                            <option v-for="evnt in events" :value="evnt">
                            {{ parseName(evnt) }}
                            </option>
                        </select>
                    </div>

                    <div class="">
                        <a class="btn" v-show="set_event" @click.prevent="setAutomation(set_event)">Use <i class="fas fa-chevron-right"></i></a>
                    </div>

                </div>

                <div class="table-item" v-else>
                    <div>
                        <input type="text" v-model="automation_key" placeholder="Type the value to trigger the automation">
                    </div>

                    <div class="">
                        <a class="btn" v-show="automation_key" @click.prevent="setAutomation('p'+automation_key)">Use <i class="fas fa-chevron-right"></i></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import Socket from "../socket.js"

    export default {

        name: 'detect-automation',
        data(){
            return {
                msgs:[],
                set_val: false,
                trigger_type:'',
                set_hours:'',
                set_mins:'',
                set_event:'',
                events:[
                    'dawn',
                    'sunrise',
                    'sunset',
                    'dusk',
                    'daylight_dim',
                    'daylight_bright',
                    'daylight_sunny'
                ],
                hours:[],
                mins:[],
                automation_key:''
            }
        },
        computed: mapState([
                'groups',
                'sensors',
                'view'
            ]),
        methods: {
            closePopup(){
                this.$store.dispatch('updateView',{obj:'popup'})
            },
            handleMessage(msg){
                if (msg.r == 'sensors' && msg.id == this.view.selected_sensor){
                    this.msgs.push(msg)
                }

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
            parseName(str){
                return str.replace(/_/g,' ')
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
            setAutomation(automation_key){

                localStorage.setItem('automation_sid','s'+this.view.selected_sensor);
                localStorage.setItem('automation_key',automation_key);
                this.$store.dispatch('updateView',{obj:'popup', val:'set_automation'})
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

            for (let hr = 0; hr <= 23;hr++){
                if (hr < 10){
                    hr = '0'+hr
                }
                this.hours.push(hr)
            }

            for (let mn = 0; mn <= 59;mn++){
                if (mn < 10){
                    mn = '0'+mn
                }
                this.mins.push(mn)
            }

        },
        created(){
            Socket.$on("message", this.handleMessage)
            this.msgs = []

            this.trigger_type = localStorage.getItem('trigger_type')

            if (this.trigger_type == 'timer'){
                this.set_val = 'time'
            }
        },
        beforeDestroy(){
            Socket.$off("message", this.handleMessage)
        }

    }

</script>
