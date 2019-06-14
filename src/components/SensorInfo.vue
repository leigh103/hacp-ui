<template>
    <div class="" v-if="sensor">
        <p>{{ sensor.name }}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['sensor'],
        data: function () {
            return {
                //nothing
            }
        },
        methods: {
        
        }
    }

</script>
