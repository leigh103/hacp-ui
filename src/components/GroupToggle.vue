<template>
    <div class="group-toggle" @click.prevent="toggle()" v-if="group" :class="{'on':group.state.any_on === true,'off':group.state.any_on === false,'unavailable':group.state.reachable === false}">
        <div class="indicator"></div>
        <p>{{ group.name }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['group', 'id'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
            toggle() {

                var action = true

                if (this.group.state.any_on === true){
                    action = false
                }

                let payload = {
                    type:'groups',
                    id:this.key,
                    obj: 'action',
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

.group-toggle {
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
