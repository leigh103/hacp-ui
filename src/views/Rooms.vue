<template>

    <div>
        <div class="view-list vh100 overflow-y pt-2" :class="{'hidden-s':view.selected_room}">
            <room-list />
        </div>
        <div class="view-page vh100 overflow-y">
            <room-page v-if="view.selected_room"/>
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
