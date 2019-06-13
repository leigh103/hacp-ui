<template>
    <div class="" @click.prevent="toggle" v-if="light">
        <label><input type="checkbox" v-model="light.state.on">{{ light.name }}</label>
    </div>
</template>

<script>

    module.exports = {
        props: ['light'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
            toggle: function (event) {

                if (this.light.state.on){
                    var action = false
                } else {
                    var action = true
                }

                let payload = {
                    type:'lights',
                    id:'11',
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
