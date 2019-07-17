<template>
    <div>

        <div class="table-item" v-for="(automation, index) in automations_arr" :class="hidePrev(automation.trigger, automations_arr[index-1])">

            <div @click.prevent="showAutomation(automation, index)">

                <div class="trigger capitalize text-bold" v-if="automation.delete === true" v-text="parseStr(automation.time)"></div>

                <div class="trigger capitalize" v-else-if="sensors[automation.orig_sensor]" :class="hidePrev(automation.trigger, automations_arr[index-1])">
                    <span class="text-bold mr-1" v-show="type == 'groups'" v-text="sensors[automation.orig_sensor].name"></span>
                    <span v-show="automation.trigger" v-html="parseVal(automation.trigger)" :class="{'text-bold':type != 'groups'}"></span>
                </div>

                <div class="trigger capitalize text-bold" v-else v-text="parseStr(automation.orig_sensor)"></div>


                <div class="entity capitalize" v-if="match(automation.action, 'lights')" v-text="lights[automation.entity_id].name"></div>
                <div class="entity capitalize" v-else-if="match(automation.action, 'groups|scene')" v-text="groups[automation.entity_id].name"></div>
                <div class="entity capitalize" v-else-if="automation.action == 'play_audio'">Play Audio via HACP</div>

            </div>

            <div class="action" @click.prevent="showAutomation(automation, index)">

                <i v-if="automation.duration" class="fas fa-clock on mr-1"></i>
                <i v-if="automation.conditions && automation.conditions.length>0" class="fas fa-clipboard-list on mr-1"></i>
                <i v-if="automation.action == 'groups_toggle'" class="fas fa-toggle-on on"></i>
                <i v-if="automation.action == 'groups_turn_on'" class="fas fa-lightbulb on"></i>
                <i v-if="automation.action == 'groups_turn_off'" class="fas fa-lightbulb off"></i>
                <i v-if="automation.action == 'lights_toggle'" class="fas fa-toggle-on on"></i>
                <i v-if="automation.action == 'lights_turn_on'" class="fas fa-lightbulb on"></i>
                <i v-if="automation.action == 'lights_turn_off'" class="fas fa-lightbulb off"></i>

                <span v-if="automation.action == 'activate_scene'">
                    <i class="fas fa-image on mr-1"></i><span v-text="groups[automation.entity_id].scenes[automation.value-1].name"></span>
                </span>

                <span v-if="automation.action == 'play_audio'">
                    <i class="fas fa-play on mr-1"></i><span class="capitalise" v-text="parseStr(automation.value)"></span>
                </span>

            </div>

            <div class="user-action">
                <div class="btn delete"><i class="fas fa-times"></i></div>
            </div>

        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props:['id', 'type'],
        data: function () {
            return {
                automations_arr:[]
            }
        },
        computed: {
            ...mapState([
                'automations',
                'groups',
                'lights',
                'sensors'
            ])
        },
        methods: {
            showAutomation(automation, key){

                localStorage.setItem('automation_sid','s'+this.view.selected_sensor);
                localStorage.setItem('automation_key',key);
                localStorage.setItem('automation_data',JSON.stringify(automation));
                this.$store.dispatch('updateView',{obj:'popup', val:'set_automation'})

            },
            findAutomations(){

                this.automations_arr = []

                let type_obj = 'entity_id'

                if (this.type == 'sensors'){
                    type_obj = 'orig_sensor'
                }

                for (var i in this.automations){

                    if ('s'+this.id == i && typeof this.automations[i] != 'object'){

                        this.automations_arr.push(this.automations[i])

                    } else if (typeof this.automations[i] == 'object'){

                        for (var ii in this.automations[i]){

                            if (this.automations[i][ii] && this.automations[i][ii].delete && this.automations[i][ii].delete === true){
                                this.automations[i][ii].time = i
                            }

                            if (ii.match(/^[pdlv]/)){
                                this.automations[i][ii].trigger = ii
                            }

                            if (this.automations[i][ii][type_obj] && this.automations[i][ii][type_obj] == this.id){

                                this.automations_arr.push(this.automations[i][ii])


                            } else if (typeof this.automations[i][ii] == 'object'){

                                for (var iii in this.automations[i][ii]){

                                    if (this.automations[i][ii][iii]){

                                        let new_arr = Object.assign(this.automations[i][ii][iii])

                                        if (new_arr[type_obj] && new_arr[type_obj] == this.id){

                                            if (new_arr.delete && new_arr.delete === true){ // if temp automation, get the time it will trigger
                                                new_arr.time = ii
                                            }

                                            if (ii.match(/^[pdlv]/)){ // if sensor automation, get the trigger value
                                                new_arr.trigger = ii
                                            }

                                            this.automations_arr.push(new_arr)

                                        }

                                    }

                                }

                            }
                        }
                    } else {
                        this.automations_arr.push(this.automations[i])
                    }
                }

            },
            hidePrev(trigger, prev){
                if (prev && prev.trigger){
                    if (prev.trigger == trigger){
                        return 'hide'
                    }
                }
            },
            parseStr(str){
                if (str && str.match(/[0-9]{4}/)){
                    str = str.split('')
                    return str[0]+str[1]+':'+str[2]+str[3]
                } else if (str) {
                    return str.replace(/_/g,' ')
                }
            },
            parseVal(str){
                if (str && str.match(/^[v]/)){

                    str = str.replace(/^[v]/,'').split('')

                    let press_type = ''

                    if (str[3] == 3){ // needs further refinement
                        press_type = 'Long Press'
                    }

                    return 'Button '+str[0]+' '+press_type
                } else if (str == 'ptrue') {
                    return '<i class="fas fa-eye on"></i>'
                } else if (str == 'pfalse') {
                    return '<i class="fas fa-eye-slash off"></i>'
                } else if (str == 'dtrue') {
                    return '<i class="fas fa-door-open on"></i>'
                } else if (str == 'dfalse') {
                    return '<i class="fas fa-door-close off"></i>'
                } else if (str) {
                    return str
                }
            },
            match(data, regex){
                if (data){
                    let re = new RegExp(regex);
                    if (data.match(re)){
                        return true
                    } else {
                        return false
                    }
                }
            }
        },
        watch: {
            id (newProp, oldProp){
                if (Object.keys(this.automations).length > 0){
                    this.findAutomations()
                }
            }
        },
        mounted () {

            if (Object.keys(this.sensors).length == 0){
                this.$store.dispatch('getEntities','sensors')
            }

            if (Object.keys(this.groups).length == 0){
                this.$store.dispatch('getEntities','groups')
            }

            if (Object.keys(this.lights).length == 0){
                this.$store.dispatch('getEntities','lights')
            }

            if (Object.keys(this.automations).length == 0){
                this.$store.dispatch('getEntities','automations')
                .then(res => {
                    this.findAutomations()
                })
            } else {
                this.findAutomations()
            }


        },
    }

</script>

<style lang="stylus">

    .trigger.hide {
        visibility: hidden;
    }


</style>
