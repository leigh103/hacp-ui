<template>

    <div>
        <div v-for="sensor in sensors">
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
