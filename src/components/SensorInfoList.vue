<template>
    <div class="table-item ml-3" v-if="hideStat()" style="width:60%">
        <div class="name">
            <span v-if="name">{{ name }}</span>
            <span v-else-if="sensors[id]">{{ sensors[id].name }}</span>
        </div>
        <div class="indicator text-right">
            <div class="stat capitalise" :class="battery_class" v-html="parseStat()"></div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import moment from 'moment'

    export default {
        name:'sensor-info-list',
        props: ['id','name','val'],
        data: function () {
            return {
                battery_class:''
            }
        },
        computed: mapState([
            'sensors'
        ]),
        methods: {
            hideStat(){
                if (this.name == 'lastupdated'){
                    return true
                } else {
                    return true
                }
            },
            parseStat(){

                if (this.name == 'temperature'){
                    return (this.val/100).toFixed(0)+'&deg;C'
                } else if (this.name == 'lastupdated'){
                    return moment(this.val).format('MMM Do[<br>]h:mma')
                } else if (this.sensors[this.id] && this.sensors[this.id].type == 'ZHAOpenClose' && this.val == true){
                    return '<i class="fas fa-door-open on"></i>'
                } else if (this.sensors[this.id] && this.sensors[this.id].type == 'ZHAOpenClose' && this.val == false){
                    return '<i class="fas fa-door-closed off"></i>'
                } else if (this.val === true){
                    return '<div class="led on"></div>'
                } else if (this.val === false ){
                    return '<div class="led off"></div>'
                } else if (this.name == 'battery' && this.sensors[this.id] && this.sensors[this.id].config.battery){
                    if (this.sensors[this.id].config.battery >= 0 && this.sensors[this.id].config.battery <= 20){
                        this.battery_class = 'replace'
                    } else if (this.sensors[this.id].config.battery > 20 && this.sensors[this.id].config.battery <= 30){
                        this.battery_class = 'warn'
                    } else {
                        this.battery_class = ''
                    }
                    return this.sensors[this.id].config.battery+'%'
                } else {

                    if (this.sensors[this.id]){

                        if (this.sensors[this.id].type == 'ZHATemperature'){
                            return (this.sensors[this.id].state.temperature/100).toFixed(0)+"&deg;"
                        }

                        if (this.sensors[this.id].type == 'ZHALightLevel'){

                            if (this.name == 'lightlevel'){
                                return this.sensors[this.id].state.lightlevel;
                            } else if (this.name == 'lux'){
                                return this.sensors[this.id].state.lux;
                            }
                        }

                        if (this.sensors[this.id].type == 'ZHAPresence'){

                            if (this.sensors[this.id].state.presence === true){
                                return '<i class="fas fa-eye on"></i>'
                            } else {
                                return '<i class="fas fa-eye-slash off"></i>'
                            }
                        }

                        if (this.sensors[this.id].type == 'ZHAOpenClose'){

                            if (this.sensors[this.id].state.open === true){
                                return '<i class="fas fa-door-open on"></i>'
                            } else {
                                return '<i class="fas fa-door-closed on"></i>'
                            }
                        }

                    }

                }
            }
        },
        mounted(){
            if (!this.sensors || !this.sensors[this.id]){
                console.log('Getting sensor '+this.id)
                this.$store.dispatch('getEntity',{type:'sensors', id:this.id})
            }
        }
    }

</script>
