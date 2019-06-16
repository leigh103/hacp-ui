<template>
    <div class="light-toggle" v-if="lights[id]" @click.prevent="toggle()" :class="{'on':lights[id].state.on === true,'off':lights[id].state.on === false,'unavailable':lights[id].state.reachable === false}">
        <div class="indicator"></div>
        <div class="name">{{ lights[id].name }}</div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['id'],
        data: function () {
            return {
                //nothing
            }
        },
        computed: mapState([
            'lights'
        ]),
        methods: {
            toggle() {

                var action = true

                if (this.lights[this.id].state.on){
                    action = false
                }

                let payload = {
                    type:'lights',
                    id:this.id,
                    obj: 'state',
                    action:{
                        on:action
                    }
                }
                this.$store.dispatch('call',payload)
            }
        },
        mounted(){

            if (!this.lights[this.id] || !this.lights[this.id].name){
                console.log('getting light')
                this.$store.dispatch('getEntity',{type:'lights', id:this.id})
            }

        }
    }

</script>

<style lang="stylus">

.light-toggle {
    display: inline-block;
    position: relative;
    vertical-align: top;
    text-align: left;
    margin: 0 1em 1em 0;
    background-color: #efefef;
    border-radius: 5px;
    padding: 1.5em;
    width: 8em;
    height: 10em;

    .name {
        position: absolute;
        display: block;
        bottom: 1.5em;
        left: 1.5em;
        width: calc(100% - 3em);
    }

    .indicator {
        position: relative;
        width: 100%;
        text-align: center;
    }

    .indicator:after {
        position: absolute;
        content:'';
        display: block;
        top: 0;
        left: calc(50% - 0.25em);
        width: 0.5em;
        height: 0.5em;
        border-radius:0.25em;
        margin-bottom: 1em;
    }

    &.on {
        .indicator:after {
            background-color: rgb(91, 240, 80);
        }
    }

    &.off {
        .indicator:after {
            background-color: #888;
        }
    }

    &.unavailable {
        opacity: 0.5;
    }

}

</style>
