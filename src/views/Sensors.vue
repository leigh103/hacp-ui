<template>

    <div class="row">
        <div class="view-list vh100 overflow-y">
            <sensor-list />
        </div>
        <div class="view-page vh100 overflow-y">
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
