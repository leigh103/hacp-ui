<template>

    <div>
        <group-list />
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'groups',
    computed: mapState([
        'groups',
        'lights'
    ]),
}
</script>
