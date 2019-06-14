<template>

    <div>
        <device-list />
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'devices',
    computed: mapState([
        'devices'
    ]),
}
</script>
