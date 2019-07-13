<template>
    <div class="toggle" v-if="hideStat()">
        <div class="indicator">
            <div class="stat capitalise" v-html="parseStat()">
            </div>
        </div>
        <div class="name">
            {{ name }}
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name:'sensor-info',
        props: ['id','name','val'],
        data: function () {
            return {

            }
        },
        computed: mapState([
            'sensors'
        ]),
        methods: {
            hideStat(){
                if (this.name == 'lastupdated'){
                    return false
                } else {
                    return true
                }
            },
            parseStat(){
                if (this.name == 'temperature'){
                    return (this.val/100).toFixed(0)+'&deg;C'
                } else if (this.val === true || this.val == 'open'){
                    return '<div class="led on"></div>'
                } else if (this.val === false || this.val == 'closed'){
                    return '<div class="led off"></div>'
                } else {
                    return this.val
                }
            }
        },
        mounted(){
            if (!this.sensors || !this.sensors[this.id]){
                console.log('Getting sensor '+this.id)
                this.$store.dispatch('getEntity',{type:'sensors', id:this.id})
            }
        }
    }

</script>
