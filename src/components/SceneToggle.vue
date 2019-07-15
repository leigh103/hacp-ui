<template>
    <div class="toggle" @click.prevent="toggle()" :class="{'on':groups[gid].action.scene == scene.id && groups[gid].action.on === true}">
        <div class="indicator">
            <div class="led" :class="{'delete':del}"></div>
        </div>
        <div class="name">{{ scene.name }}</div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['scene','gid','del'],
        data: function () {
            return {
                //nothing
            }
        },
        computed: mapState([
            'groups'
        ]),
        methods: {
            toggle() {

                if (!this.del){

                    let payload = {
                        url:'groups/'+this.gid+'/scenes/'+this.scene.id+'/recall'
                    }

                    this.$store.dispatch('call',payload)
                    .then(res => {
                        let payload = {
                            method:'GET',
                            url:'init/groups/'+this.gid
                        }
                        this.$store.dispatch('hacpCall',payload)

                    })

                } else {

                    var prompt = confirm('Are you sure you want to delete this scene?')

                    if (prompt){
                        let payload = {
                            method:'DELETE',
                            url:'groups/'+this.gid+'/scenes/'+this.scene.id
                        }

                        this.$store.dispatch('call',payload)
                        .then(res => {
                            let payload = {
                                method:'GET',
                                url:'init/groups/'+this.gid
                            }
                            this.$store.dispatch('hacpCall',payload)

                        })
                    }


                }


            }
        },
        mounted(){

        }
    }

</script>

<style lang="stylus">



</style>
