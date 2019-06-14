<template>
    <div class="" v-if="device">
        <p>{{ device.name }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['device'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {

        }
    }

</script>
