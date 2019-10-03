<template>

    <div class="row">
        <div class="view-list vh100 overflow-y" :class="{'hidden-s':view.selected_group}">
            <group-list />
        </div>
        <div class="view-page vh100 overflow-y">
            <group-page v-if="view.selected_group"/>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'

export default {
    name: 'groups',
    computed: mapState([
        'view'
    ]),

}
</script>
