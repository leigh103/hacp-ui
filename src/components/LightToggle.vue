<template>
    <div class="toggle" v-if="lights[id]" @click.prevent="toggle()" :class="{'on':lights[id].state.on === true,'off':lights[id].state.on === false,'unavailable':lights[id].state.reachable === false}">
        <div class="indicator">
            <div class="led"></div>
        </div>
        <div class="name text-bold">{{ lights[id].name }}</div>
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
                    effect:'lightning',
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
