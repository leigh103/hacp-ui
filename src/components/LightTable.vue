<template>
    <div class="table-item" v-if="lights[id]" :class="{'unavailable':lights[id].state.reachable === false}">

        <div class="indicator" @click.prevent="toggle()">
            <div class="led" :class="{'on':lights[id].state.on === true,'off':lights[id].state.on === false,'unavailable':lights[id].state.reachable === false}"></div>
        </div>

        <div class="name">{{ lights[id].name }}</div>

        <div class="brightness">
            <slider :light="id" type="bri" v-if="lights[id].state.bri"></slider>
        </div>

        <div class="color">
            <slider :light="id" :type="lights[id].state.colormode"></slider>
        </div>


    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['id'],
        data: function () {
            return {
                //nothing
            }
        },
        computed: mapState([
            'lights'
        ]),
        methods: {
            toggle() {

                var action = true

                if (this.lights[this.id].state.on){
                    action = false
                }

                let payload = {
                    url:'lights/'+this.id+'/state',
                    data:{
                        on:action
                    }
                }
                this.$store.dispatch('call',payload)

            }
        },
        mounted(){

            if (!this.lights[this.id] || !this.lights[this.id].name){
                console.log('getting light')
                this.$store.dispatch('getEntity',{type:'lights', id:this.id})
            }

        }
    }

</script>

<style lang="stylus">



</style>
