<template>

    <div>
        <div class="view-list vh100 overflow-y pt-2">
            <alarm-list />
        </div>
        <div class="view-page vh100 overflow-y">
            <alarm-page v-if="view.selected_alarm >=0 || view.selected_alarm == 'new'"/>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'devices',
    computed: mapState([
        'view'
    ]),
}
</script>
