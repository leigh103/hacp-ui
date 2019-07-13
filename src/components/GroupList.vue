<template>
    <div>
        <div class="list-item"
                v-for="(group, key) in groups"
                v-if="group.lights.length > 0"
                :class="{'selected':view.selected_group === key}"
        >
            <div class="indicator" @click.prevent="toggle(key)"><div class="led" :class="{'on':group.state.any_on === true, 'off':group.state.any_on === false}" v-show="group.lights.length > 0"></div></div>
            <div class="name" @click.prevent="selectGroup(key)">{{ group.name }}</div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['group', 'id'],
        data: function () {
            return {

            }
        },
        computed: mapState([
            'groups',
            'view',
        ]),
        methods: {
            toggle(key) {

                var action = true

                if (this.groups[key].state.any_on === true){
                    action = false
                }

                let payload = {
                    type:'groups',
                    id:key,
                    obj: 'action',
                    action:{
                        on:action
                    }
                }

                this.$store.dispatch('call',payload)

            },
            selectGroup(key){
                this.$store.dispatch('updateView',{obj:'selected_group', val:key})
            }
        },
        mounted () {
            if (Object.keys(this.groups).length == 0){
                this.$store.dispatch('getEntities','groups')
            }
        },
    }

</script>

<style lang="stylus">



</style>
