<template>
    <div>
        <div class="list-item"
                v-for="(group, key) in groups"
                :class="{'selected':view.selected_group === key || !view.selected_group}"
        >
            <div class="indicator" @click.prevent="toggle(key)"><div class="led" :class="{'on':group.state.any_on === true, 'off':group.state.any_on === false}" v-show="group.lights.length > 0"></div></div>
            <div class="name" @click.prevent="selectGroup(key)">{{ group.name }}</div>
        </div>
        <div class="list-item" @click.prevent="selectGroup('new')">
            <div class="indicator text-white">+</div>
            <div class="name text-grey"></div>
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
                    url:'groups/'+key+'/action',
                    data:{
                        on:action
                    }
                }

                this.$store.dispatch('call',payload)

            },
            selectGroup(key){

                this.$store.dispatch('getEntity',{type:'groups', id:key}) // get the group data from the server, rather than relying on the socket data
                .then(res => {
                    this.$store.dispatch('updateView',{obj:'selected_group', val:key})
                })

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
