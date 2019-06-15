<template>
    <div class="light-toggle" @click.prevent="toggle()" v-if="light" :class="{'on':light.state.on === true,'off':light.state.on === false,'unavailable':light.state.reachable === false}">
        <div class="indicator"></div>
        <p>{{ light.name }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['light','id'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
            toggle(event) {

                if (this.light.state.on){
                    var action = false
                } else {
                    var action = true
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

    p {
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
