<template>


    <div class="toggle" @click.prevent="toggle()" v-if="group" :class="{'on':group.state.any_on === true,'off':group.state.any_on === false,'unavailable':group.state.reachable === false}">
        <div class="indicator">
            <div class="led"></div>
        </div>
        <div class="name">{{ group.name }}</div>
    </div>

    <div class="toggle" @click.prevent="toggle()" v-else-if="id && groups[id]" :class="{'on':groups[id].state.any_on === true,'off':groups[id].state.any_on === false,'unavailable':groups[id].state.reachable === false}">
        <div class="indicator">
            <div class="led"></div>
        </div>
        <div class="name">{{ groups[id].name }}</div>
    </div>


</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['group', 'id'],
        data() {
            return {
                //nothing
            }
        },
        computed: mapState([
                'groups'
            ]),
        methods: {
            toggle() {

                if (!this.group){ // if the group prop isn't passed
                    var any_on = this.groups[this.id].state.any_on
                    var gid = this.id
                } else {
                    var any_on = this.group.state.any_on
                    var gid = this.group.id
                }

                var action = true

                if (any_on === true){
                    action = false
                }

                let payload = {
                    url:'groups/'+gid+'/action',
                    data:{
                        on:action
                    }
                }

                this.$store.dispatch('call',payload)

            }
        },
        mounted(){

            if (Object.keys(this.groups).length == 0 && this.group && Object.keys(this.group).length == 0){
                this.$store.dispatch('getEntities','groups')
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
