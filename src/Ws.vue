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
                error: '',
                timer:''
            }
        },
        computed: mapState([
            'view'
        ]),
        methods:{
            handleMessage(msg){
            //    console.log(msg)
                if (msg.r == 'lights'){
                    this.$store.dispatch('getEntities','lights')
                } else if (msg.r == 'groups'){
                    this.$store.dispatch('getEntities','groups')
                } else if (msg.r == 'scenes'){
                //    console.log(this.view.selected_group)
                    this.$store.dispatch('getEntity',{type:'groups',id:this.view.selected_group})

                } else if (msg.r == 'automation_run'){

                    if (msg.state.entity_id == 'playaudio'){
                        let payload = {
                            file:msg.state.value
                        }
                        this.$store.dispatch('playAudio',payload)
                    }

                }

            },
            updateTime (){

                var d = new Date();

                if (d.getMinutes() == 0){
                    if (d.getHours() == 7 || d.getHours() == 16){
                        window.location.href = "/"
                    }
                }


            }

        },
        created(){
            Socket.$on("message", this.handleMessage)
        //    this.timerID = setInterval(this.updateTime, 60000);
        },
        beforeDestroy(){
            Socket.$off("message", this.handleMessage)
            clearInterval(this.timerID)
        }
    }

</script>
