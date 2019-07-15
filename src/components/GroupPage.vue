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
                        <a class="btn" @click.prevent="light_edit = !light_edit"><span v-show="light_edit">&times;</span><span v-show="!light_edit">Edit</span></a>
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
                        <div class="inline" v-show="!show_scene_name">
                            <a class="btn bg-light-grey mr-1" v-show="scene_edit" @click.prevent="saveSene('new')">+ Save New Scene</a>
                            <a class="btn bg-light-grey mr-1" v-show="scene_edit" @click.prevent="saveScene(groups[view.selected_group].action.scene)">+ Update <span class="uppercase" v-text="groups[view.selected_group].scenes[groups[view.selected_group].action.scene-1].name"></span></a>
                            <a class="btn" @click.prevent="scene_edit = !scene_edit"><span v-show="scene_edit">&times;</span><span v-show="!scene_edit">Edit</span></a>
                        </div>
                        <div class="inline" v-show="show_scene_name">
                            <input type="text" v-model="scene_name" class="mr-1" placeholder="New scene name..." style="width: 50%">
                            <a class="btn mr-1 bg-green text-white" v-show="scene_edit" @click.prevent="saveSene('new')"><i class="fas fa-save"></i></a>
                            <a class="btn delete mr-1" v-show="scene_edit" @click.prevent="scene_name='';saveSene('new')">&times;</a>
                        </div>

                    </div>
                </div>
                <div class="underline"></div>
                <scene-toggle :scene="scene" :id="scene.id" :gid="view.selected_group" :del="scene_edit" v-for="scene in groups[view.selected_group].scenes"></scene-toggle>
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
                light_edit:false,
                scene_name:'',
                show_scene_name:false
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
            },
            saveSene(scid){

                if (scid == 'new'){
                    // POST /api/<apikey>/groups/<group_id>/scenes

                    if (this.scene_name){

                        let payload = {
                            method:'POST',
                            url:'groups/'+this.view.selected_group+'/scenes',
                            data:{
                                name:this.scene_name
                            }
                        }

                        this.$store.dispatch('call',payload)
                        .then(res => {
                            let payload = {
                                method:'GET',
                                url:'init/groups/'+this.view.selected_group
                            }
                            this.$store.dispatch('hacpCall',payload)
                            this.scene_name = ''
                            this.show_scene_name = false

                        })

                    } else {

                        this.show_scene_name = !this.show_scene_name

                    }



                } else {
                    //PUT /api/<apikey>/groups/<group_id>/scenes/<scene_id>/store

                    let payload = {
                        url:'groups/'+this.view.selected_group+'/scenes/'+scid+'/store'
                    }
                    this.$store.dispatch('call',payload)

                }
            }

        },
        mounted () {

        }

    }

</script>
