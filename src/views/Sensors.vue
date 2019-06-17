<template>

    <div class="row">
        <div class="block-20 bg-grey vh100 overflow-y">
            <sensor-list />
        </div>
        <div class="block-80 bg-white vh100 overflow-y">
            <sensor-page v-if="view.selected_sensor"/>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'sensors',
    computed: mapState([
        'view'
    ]),
}
</script>
