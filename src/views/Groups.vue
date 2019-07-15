<template>

    <div class="row">
        <div class="block-20 bg-list vh100 overflow-y pt-2">
            <group-list />
        </div>
        <div class="block-80 view-page vh100 overflow-y">
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
