<template>
    <div>
        <div class="p-2 text-left">

            <h1 class="" v-text="groups[view.selected_group].name"></h1>
            <h4>This group contains <span v-show="groups[view.selected_group].scenes.length>0">{{ groups[view.selected_group].scenes.length }} scenes and </span>{{ groups[view.selected_group].lights.length }} lights</h4>

            <div class="mt-2">

                <div class="row">
                    <div class="block-50">
                        <h3 class="inline">Lights</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn bg-light-grey mr-1" v-show="light_edit" @click.prevent="showPopup('manage_lights')">+ Manage Lights</a>
                        <a class="btn" @click.prevent="light_edit = !light_edit"><span v-show="light_edit">Close</span><span v-show="!light_edit">Edit</span></a>
                    </div>
                </div>

                <div class="underline"></div>
                <light-table :key="light" :id="light" v-for="light in groups[view.selected_group].lights" v-if="light_edit"></light-table>
                <light-toggle :key="light" :id="light" v-for="light in groups[view.selected_group].lights" v-if="!light_edit"></light-toggle>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="block-50">
                        <h3 class="inline">Scenes</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn" @click.prevent="scene_edit = !scene_edit">Edit</a>
                    </div>
                </div>
                <div class="underline"></div>
                <scene-toggle :scene="scene" :id="scene.id" :gid="view.selected_group" v-for="scene in groups[view.selected_group].scenes"></scene-toggle>
            </div>

            <div class="mt-2">
                <h3>Automations</h3>
                <div class="underline"></div>
                <automations-table :id="view.selected_group" :type="'groups'"></automations-table>
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
                scene_edit:false,
                light_edit:false
            }
        },
        computed: mapState([
            'groups',
            'lights',
            'view'
        ]),
        methods: {
            showPopup(){
                this.$store.dispatch('updateView',{obj:'popup', val:'manage_lights'})
            }
        },
        mounted () {

        }

    }

</script>
