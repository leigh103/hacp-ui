<template>
    <div>
        <div class="list-item"
                v-for="(alrm, key) in alarm.alarms"
                :class="{'selected':view.selected_alarm === key || !view.selected_group}"
        >
            <div class="indicator" @click.prevent="setAlarm(key)"><div class="led" :class="{'on':alarm.armed === true && alarm.key === key,'off': alarm.key != key || alarm.key === false}"></div></div>
            <div class="name" @click.prevent="selectAlarm(key)">{{ alrm.name }}</div>
        </div>
        <div class="list-item" @click.prevent="selectAlarm('new')">
            <div class="indicator text-white">+</div>
            <div class="name text-grey"></div>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: [],
        data: function () {
            return {

            }
        },
        computed: mapState([
            'alarm',
            'view',
        ]),
        methods: {
            selectAlarm(key){
                this.$store.dispatch('updateView',{obj:'selected_alarm', val:key})
            },
            setAlarm(key){
                this.$store.dispatch('updateView',{obj:'selected_alarm', val:key})
                this.$store.dispatch('updateView',{obj:'popup', val:'set_alarm'})
            }
        },
        mounted () {
            if (Object.keys(this.alarm).length == 0){
                this.$store.dispatch('getEntities','alarm')
            }
        },
    }

</script>

<style lang="stylus">



</style>
