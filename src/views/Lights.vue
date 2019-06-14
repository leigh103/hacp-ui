<template>

    <div>
        <div v-for="(light,key) in lights">
            <light-toggle :light="light" :id="key"></light-toggle>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'groups',
    computed: mapState([
        'lights'
    ]),
}
</script>
