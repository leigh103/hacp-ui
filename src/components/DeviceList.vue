<template>

    <div>
        <div v-for="device in devices">
            <device-info v-bind:device="device"></device-info>
        </div>
    </div>

</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: 'DeviceList',
        props: {},
        computed: mapState([
            'devices'
        ])
    }

</script>

<style scoped>

</style>
