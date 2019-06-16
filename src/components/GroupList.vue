<template>
    <div>
        <div class="group-list"
                v-for="(group, key) in groups"
                v-if="group"
                :class="{'on':group.state.any_on === true,'off':group.state.any_on === false,'unavailable':group.state.reachable === false}"
        >
            <div class="indicator" @click.prevent="toggle(key)"><div class="indicator-led" v-show="group.lights.length > 0"></div></div>
            <div class="name" @click.prevent="selectGroup(key)">{{ group.name }}</div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['group', 'id'],
        data: function () {
            return {

            }
        },
        computed: mapState([
            'groups',
            'view',
        ]),
        methods: {
            toggle(key) {

                var action = true

                if (this.group.state.any_on === true){
                    action = false
                }

                let payload = {
                    type:'groups',
                    id:key,
                    obj: 'action',
                    action:{
                        on:action
                    }
                }

                this.$store.dispatch('call',payload)

            },
            selectGroup(key){
                this.$store.dispatch('updateView',{obj:'selected_group', val:key})
            }
        },
        mounted () {
            if (Object.keys(this.groups).length == 0){
                this.$store.dispatch('getEntities','groups')
            }
        },
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
