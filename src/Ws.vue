<template>
    <div>{{ error }}</div>
</template>

<script>

    import Socket from "./socket.js"
    import { mapState } from 'vuex'

    export default {
        name: 'Ws',
        data(){
            return {
                messages: [],
                error: ''
            }
        },
        computed: mapState([
            'view'
        ]),
        methods:{
            handleMessage(msg){
                console.log(msg)
                if (msg.r == 'lights'){
                    this.$store.dispatch('getEntities','lights')
                } else if (msg.r == 'groups'){
                    this.$store.dispatch('getEntities','groups')
                } else if (msg.r == 'scenes'){
                //    console.log(this.view.selected_group)
                    this.$store.dispatch('getEntity',{type:'groups',id:this.view.selected_group})
                }

            }
        },
        created(){
            Socket.$on("message", this.handleMessage)
        },
        beforeDestroy(){
            Socket.$off("message", this.handleMessage)
        }
    }

</script>
