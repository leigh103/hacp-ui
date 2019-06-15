<template>
    <div class="" v-if="device">
        <p>{{ device.name }}</p>
        <p>{{ device.present }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['device'],
        data: function () {
            return {

            }
        },
        methods: {

        }
    }

</script>
