<template>
    <div class="group-toggle" @click.prevent="toggle()" v-if="group" :class="{'on':group.state.any_on === true,'off':group.state.any_on === false,'unavailable':group.state.reachable === false}">
        <div class="indicator"></div>
        <p>{{ group.name }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['group', 'id'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
            toggle: function (event) {

                if (this.group.state.any_on === true){
                    var action = false
                } else {
                    var action = true
                }

                let payload = {
                    type:'groups',
                    id:this.id,
                    obj: 'action',
                    action:{
                        on:action
                    }
                }

                this.$store.dispatch('call',payload)

            }
        }
    }

</script>
