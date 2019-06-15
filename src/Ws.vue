<template>
    <div>{{ error }}</div>
</template>

<script>

    import Socket from "./socket.js"

    export default {
        name: 'Ws',
        data(){
            return {
                messages: [],
                error: ''
            }
        },
        methods:{
            handleMessage(msg){
                console.log(msg)
                if (msg.r == 'lights'){
                    this.$store.dispatch('getEntities','lights')
                } else if (msg.r == 'groups'){
                    this.$store.dispatch('getEntities','groups')
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
