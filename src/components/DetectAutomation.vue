<template>
    <div class="popup">

        <div class="popup-content">
            <div class="row">
                <div class="block-50" v-if="view && view.selected_sensor && sensors && sensors[view.selected_sensor]">
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
                    <a @click.prevent="set_val = !set_val" class="btn bg-light-grey mr-1"><span v-show="!set_val">+ Enter Value</span><span v-show="set_val">< View Events</span></a>
                    <a class="btn" @click.prevent="closePopup()">&times; Close</a>
                </div>
            </div>
            <div v-show="!set_val" class="py-3">
                <div v-for="msg in msgs">

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.buttonevent">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseButton(msg.state.buttonevent)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation(msg.state.buttonevent)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.temperature">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseTemp(msg.state.temperature)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation(msg.state.temperature)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.presence">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseMotion(msg.state.presence)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation(msg.state.presence)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                    <div class="table-item" v-if="msg.r == 'sensors' && msg.id && msg.state && msg.state.open">
                        <div class="capitalise text-bold" v-if="msg.id && msg.state" v-text="sensors[msg.id].name"></div>
                        <div class="capitalise" v-text="parseDoor(msg.state.open)"></div>
                        <div class="">
                            <a class="btn" @click.prevent="setAutomation(msg.state.open)">Use <i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>

                </div>
                <i class="fas fa-circle-notch spinner" v-show="msgs.length == 0"></i>
            </div>
            <div v-show="set_val" class="py-3">
                <div class="table-item">
                    <div>
                        <input type="text" v-model="automation_key" placeholder="Type the value to trigger the automation">
                    </div>

                    <div class="">
                        <a class="btn" @click.prevent="setAutomation(automation_key)">Use <i class="fas fa-chevron-right"></i></a>
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
                automation_key:''
            }
        },
        computed: mapState([
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
                automation_key = 's'+automation_key
                console.log(automation_key)
                this.$store.dispatch('updateView',{obj:'new_automation', val:automation_key, subval:{}})
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

        },
        created(){
            Socket.$on("message", this.handleMessage)
            this.msgs = []
        },
        beforeDestroy(){
            Socket.$off("message", this.handleMessage)
        }

    }

</script>
