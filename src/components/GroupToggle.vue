<template>
    <div class="" @click.prevent="toggle" v-if="group">
        <label><input type="checkbox" v-model="group.action.on">{{ group.name }}</label>
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

                if (this.group.action.on){
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
