<template>
    <div class="toggle">
        <div class="indicator">
            <div class="stat">
                {{ sensors[id].state[obj] }}
            </div>
        </div>
        <div class="name">
            {{ obj }}
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name:'sensor-info',
        props: ['id','obj'],
        data: function () {
            return {

            }
        },
        computed: mapState([
            'sensors'
        ]),
        methods: {

        },
        mounted(){
            if (!this.sensors || !this.sensors[this.id]){
                console.log('Getting sensor '+this.id)
                this.$store.dispatch('getEntity',{type:'sensors', id:this.id})
            }
        }
    }

</script>
