<template>
    <div>

        <div class="toggle" v-for="(automation, index) in automations_arr" :class="hidePrev(automation.trigger, automations_arr[index-1])" @click.prevent="showAutomation(automation, index)">

            <div class="indicator">
                <div class="capitalize" v-if="automation.delete === true" v-text="parseStr(automation.time)"></div>

                <div class="capitalize" v-else-if="sensors[automation.orig_sensor]" :class="hidePrev(automation.trigger, automations_arr[index-1])">
                    <div v-show="automation.trigger" v-html="parseVal(automation.trigger)" class=""></div>
                </div>

                <div class="capitalize" v-else v-text="parseStr(automation.orig_sensor)"></div>
            </div>
            <div class="name">
                <div class="text-grey">{{ parseStr(automation.action) }}</div>
                <div v-if="automation.value" class="">
                    <span v-if="automation.action == 'activate_scene' && type == 'groups'">{{groups[view.selected_group].scenes[automation.value-1].name}}</span>
                    <span v-if="automation.action == 'play_audio'">{{parseStr(automation.value)}}</span>
                </div>
                <div v-if="automation.entity_id" class="">
                    <span v-if="match(automation.action,'groups')">{{groups[automation.entity_id].name}}</span>
                    <span v-if="match(automation.action,'lights')">{{lights[automation.entity_id].name}}</span>
                </div>
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
                'sensors',
                'view'
            ])
        },
        methods: {
            showAutomation(automation, key){

                if (!automation.delete){
                    localStorage.setItem('automation_sid','s'+this.view.selected_sensor);
                    localStorage.setItem('automation_key',automation.trigger);
                    localStorage.setItem('automation_update',true)
                    localStorage.setItem('automation_data',JSON.stringify(automation));
                    this.$store.dispatch('updateView',{obj:'popup', val:'set_automation'})
                } else {
                    alert('This is a scheduled automation set by HACP. It cannot be edited, but it can be deleted')
                }

            },
            findAutomations(){

                this.automations_arr = []
                this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})

                let type_obj = 'entity_id'

                if (this.type == 'sensors'){
                    type_obj = 'orig_sensor'
                }

                for (var i in this.automations){

                //    console.log(i, this.automations[i])

                    var re = RegExp('s'+this.id)

                    if (this.type == 'sensors' && i.match(re)){

                        for (var ii in this.automations[i]){

                            if (typeof this.automations[i][ii] == 'object'){

                                for (var iii in this.automations[i][ii]){

                                    if (ii.match(/^[pdlv]/)){
                                        this.automations[i][ii][iii].trigger = ii
                                    }

                                    this.automations_arr.push(this.automations[i][ii][iii])
                                    this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})

                                }

                            }
                        }

                    } else {

                        for (var ii in this.automations[i]){

                            if (this.automations[i][ii].entity_id == this.id){

                                this.automations[i][ii].time = i
                                this.automations_arr.push(this.automations[i][ii])
                                this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})

                            }

                        }

                    }

                    // if ('s'+this.id == i && typeof this.automations[i] != 'object'){
                    //
                    //     this.automations_arr.push(this.automations[i])
                    //     this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})
                    //
                    // } else if (typeof this.automations[i] == 'object'){
                    //
                    //     for (var ii in this.automations[i]){
                    //
                    //         if (this.automations[i][ii] && this.automations[i][ii].delete && this.automations[i][ii].delete === true){
                    //             this.automations[i][ii].time = i
                    //         }
                    //
                    //         if (ii.match(/^[pdlv]/)){
                    //             this.automations[i][ii].trigger = ii
                    //         }
                    //
                    //         if (this.automations[i][ii][type_obj] && this.automations[i][ii][type_obj] == this.id){
                    //
                    //             this.automations_arr.push(this.automations[i][ii])
                    //             this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})
                    //
                    //         } else if (typeof this.automations[i][ii] == 'object'){
                    //
                    //             for (var iii in this.automations[i][ii]){
                    //
                    //                 if (this.automations[i][ii][iii]){
                    //
                    //                     let new_arr = Object.assign(this.automations[i][ii][iii])
                    //
                    //                     if (new_arr[type_obj] && new_arr[type_obj] == this.id){
                    //
                    //                         if (new_arr.delete && new_arr.delete === true){ // if temp automation, get the time it will trigger
                    //                             new_arr.time = ii
                    //                         }
                    //
                    //                         if (ii.match(/^[pdlv]/)){ // if sensor automation, get the trigger value
                    //                             new_arr.trigger = ii
                    //                         }
                    //
                    //                         this.automations_arr.push(new_arr)
                    //                         this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})
                    //
                    //                     }
                    //
                    //                 }
                    //
                    //             }
                    //
                    //         }
                    //     }
                    // } else {
                    //     this.automations_arr.push(this.automations[i])
                    //     this.$store.dispatch('updateView',{obj:'found_automations', val:this.automations_arr.length})
                    // }
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
                    return str.replace(/^groups|lights/,'').replace(/_/g,' ')
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
                    return '<i class="fas fa-door-closed on"></i>'
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
