<template>
    <div>
        <div class="p-2 text-left">

            <h1 class="" v-text="groups[view.selected_group].name"></h1>
            <h4>This group contains <span v-show="groups[view.selected_group].scenes.length>0">{{ groups[view.selected_group].scenes.length }} scenes and </span>{{ groups[view.selected_group].lights.length }} lights</h4>

            <div class="mt-2">
                <h3>Lights</h3>
                <div class="underline"></div>
                <light-toggle :key="light" :id="light" v-for="light in groups[view.selected_group].lights"></light-toggle>
            </div>

            <div class="mt-2">
                <h3>Scenes</h3>
                <div class="underline"></div>
                <scene-toggle :scene="scene" :id="scene.id" :gid="view.selected_group" v-for="scene in groups[view.selected_group].scenes"></scene-toggle>
            </div>

            <div class="mt-2">
                <h3>Automations</h3>
                <div class="underline"></div>
                <automations-list :id="view.selected_group" :type="'groups'"></automations-list>
            </div>

            <div class="p-5">
            </div>

        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'groups',
        data(){
            return {

            }
        },
        computed: mapState([
            'groups',
            'lights',
            'view'
        ]),
        mounted () {

        },

    }

</script>
