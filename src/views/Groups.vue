<template>

    <div class="row">
        <div class="block-20 bg-grey vh100 overflow-y">
            <group-list />
        </div>
        <div class="block-80 bg-white vh100 overflow-y">
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
