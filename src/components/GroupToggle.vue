<template>
    <div class="" @click.prevent="toggle" v-if="group">
        <label><input type="checkbox" v-model="group.action.on">{{ group.name }}</label>
    </div>
</template>

<script>

    module.exports = {
        props: ['group'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
            toggle: function (event) {

                if (this.group.action.on){
                    var action = false
                } else {
                    var action = true
                }

                let payload = {
                    type:'groups',
                    id:'7',
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
