<template>
    <div class="group-list" v-if="group" :class="{'on':group.state.any_on === true,'off':group.state.any_on === false,'unavailable':group.state.reachable === false}">
        <div class="indicator" @click.prevent="toggle()"><div class="indicator-led" v-show="group.lights.length > 0"></div></div>
        <div class="name">{{ group.name }}</div>
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
            toggle: function (event) {

                if (this.group.state.any_on === true){
                    var action = false
                } else {
                    var action = true
                }

                let payload = {
                    type:'groups',
                    id:this.id,
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

.group-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: left;
    border-radius: 5px;
    width: 100%;
    height: 4em;

    & > div {
        height:100%;
        padding: 1em;
    }

    .name {
        flex:1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0;
        cursor: pointer;
        color: white;
    }

    .indicator {
        flex: 0 0 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &-led {
            display:block;
            width: 0.5em;
            height: 0.5em;
            border-radius:0.25em;
        }
    }

    &.on {
        .indicator-led {
            background-color: rgb(91, 240, 80);
        }
    }

    &.off {
        .indicator-led {
            background-color: #888;
        }
    }

    &.unavailable {
        opacity: 0.5;
    }

}

</style>
