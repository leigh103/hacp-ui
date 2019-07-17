<template>

    <div>
        <div class="view-list vh100 overflow-y pt-2">
            <device-list />
        </div>
        <div class="view-page vh100 overflow-y">
            <device-page v-if="view.selected_device"/>
        </div>
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
