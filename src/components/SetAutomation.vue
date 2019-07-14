<template>
    <div class="popup">

        <div class="popup-content">
            <div class="row">
                <div class="block-50">
                    <h3 class="inline">Set Automation</h3>
                    <p>Set the options below to set your automation's actions</p>
                    </p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn" @click.prevent="closePopup()">&times; Close</a>
                </div>
            </div>

            <div class="py-3">

                <div class="row">
                    <div class="block-50 margin">
                        <h4>Action</h4>
                        <select v-model="automation_action">
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
                    <div class="block-50 margin">

                        <h4>Entity</h4>
                        <select v-if="match(automation_action,'group')">
                            <option value="" disabled>Select a Group...</option>
                            <option v-for="(group, key) in groups" v-value="key" v-text="group.name"></option>
                        </select>

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
                automation_action:'',
                automation_entity:''
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
            console.log(this.view.new_automation)
        }
    }

</script>
