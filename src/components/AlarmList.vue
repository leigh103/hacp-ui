<template>
    <div>
        <div class="list-item"
                v-for="(alarm, key) in alarm.alarms"
                :class="{'selected':view.selected_alarm === key}"
        >
            <div class="indicator"><div class="led"></div></div>
            <div class="name" @click.prevent="selectAlarm(key)">{{ alarm.name }}</div>
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
