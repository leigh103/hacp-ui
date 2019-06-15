<template>

    <div class="row">
        <div class="block-20 margin p-1 bg-topaz text-white" v-for="sensor in sensors">
            <sensor-info v-bind:sensor="sensor"></sensor-info>
        </div>
    </div>

</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: 'SensorList',
        props: {},
        computed: mapState([
            'sensors'
        ])
    }

</script>

<style scoped>

</style>
