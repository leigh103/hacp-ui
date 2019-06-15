<template>
    <div class="light-toggle" @click.prevent="toggle()" v-if="light" :class="{'on':light.state.on === true,'off':light.state.on === false,'unavailable':light.state.reachable === false}">
        <div class="indicator"></div>
        <p>{{ light.name }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['light','id'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
            toggle(event) {

                if (this.light.state.on){
                    var action = false
                } else {
                    var action = true
                }

                let payload = {
                    type:'lights',
                    id:this.id,
                    obj: 'state',
                    action:{
                        on:action
                    }
                }
                this.$store.dispatch('call',payload)
            }
        }
    }

</script>

<style lang="stylus">



</style>
