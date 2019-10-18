<template>
    <div>

        <div class="text-left" v-if="view.selected_group == 'new'">
            <div class="row">
                <div class="block-50">
                    <h1 class=""><input type="text" class="no-style" v-model="new_group_name" placeholder="New Group Name..."></h1>
                    <p>Type a new name for the group above and click save</p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn save"@click.prevent="saveNewGroup()"><i class="fas fa-save"></i></a>
                </div>
            </div>

        </div>

        <div class="text-left" v-if="view.selected_group != 'new'">

            <h1 class="text-blue" v-text="groups[view.selected_group].name"></h1>
            <h4 class="">This group contains <span v-show="groups[view.selected_group].scenes.length>0">{{ groups[view.selected_group].scenes.length }} scenes and </span>{{ groups[view.selected_group].lights.length }} lights</h4>

            <div class="mt-2">

                <div class="row">
                    <div class="block-50">
                        <h3 class="text-blue inline">Lights</h3>
                    </div>
                    <div class="block-50 text-right">

                        <a class="btn add" v-show="light_edit || groups[view.selected_group].lights.length==0" @click.prevent="showPopup('manage_lights')"><i class="fas fa-plus"></i></a>

                        <a class="btn ml-1 close" v-show="groups[view.selected_group].lights.length>0" @click.prevent="light_edit = !light_edit"><i class="fas fa-times" v-show="light_edit"></i><i class="fas fa-edit" v-show="!light_edit"></i></a>

                    </div>
                </div>

                <div class="underline"></div>
                <div class="toggle-wrap" :class="{'scroll-horizontal-s':!light_edit}">
                    <light-table :key="light" :id="light" v-for="light in groups[view.selected_group].lights" v-if="light_edit"></light-table>
                    <light-toggle :key="light" :id="light" v-for="light in groups[view.selected_group].lights" v-if="!light_edit"></light-toggle>
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="block-50">
                        <h3 class="text-blue inline">Scenes</h3>
                    </div>
                    <div class="block-50 text-right">

                        <div class="inline" v-show="!show_scene_name">

                            <a class="btn add" :class="{'saved':new_scene_saved}" v-show="scene_edit || groups[view.selected_group].scenes.length==0" @click.prevent="saveScene('new')"><i class="fas fa-plus"></i></a>

                            <a class="btn save ml-1 mr-1" :class="{'saved':scene_saved}" v-if="groups[view.selected_group].scenes.length>0" v-show="scene_edit" @click.prevent="saveScene(groups[view.selected_group].action.scene)">
                                <i class="fas fa-save mr-1"></i>
                                <span class="uppercase" v-if="groups[view.selected_group].scenes[groups[view.selected_group].action.scene-1]" v-text="groups[view.selected_group].scenes[groups[view.selected_group].action.scene-1].name"></span>
                            </a>

                            <a class="btn close" v-if="groups[view.selected_group].scenes.length>0" @click.prevent="scene_edit = !scene_edit"><i class="fas fa-times" v-show="scene_edit"></i><i class="fas fa-edit" v-show="!scene_edit"></i></a>

                        </div>

                        <div class="inline" v-show="show_scene_name">

                            <input type="text" v-model="scene_name" class="mr-1" placeholder="New scene name..." style="width: 50%; margin-bottom:0; margin-top:0">

                            <a class="btn mr-1 save" v-show="scene_edit" @click.prevent="saveScene('new')"><i class="fas fa-save"></i></a>

                            <a class="btn delete" v-show="scene_edit" @click.prevent="scene_name='';saveScene('new')"><i class="fas fa-times"></i></a>

                        </div>

                    </div>
                </div>
                <div class="underline"></div>
                <div class="toggle-wrap scroll-horizontal-s">
                    <scene-toggle :scene="scene" :id="scene.id" :gid="view.selected_group" :del="scene_edit" v-for="scene in groups[view.selected_group].scenes"></scene-toggle>
                </div>
            </div>

            <div class="mt-2">
                <div class="row">
                    <div class="block-50">
                        <h3 class="text-blue inline">Timers</h3>
                    </div>
                    <div class="block-50 text-right">
                        <a class="btn add" v-show="automations_edit || view.found_automations == 0" @click.prevent="openAddAutomation()"><i class="fas fa-plus"></i></a>
                        <a class="btn close ml-1" v-show="view.found_automations > 0" @click.prevent="automations_edit = !automations_edit"><i class="fas fa-times" v-show="automations_edit"></i><i class="fas fa-edit" v-show="!automations_edit"></i></a>
                    </div>
                </div>
                <div class="underline"></div>
                <div class="toggle-wrap" :class="{'scroll-horizontal-s':!automations_edit}">
                    <automations-toggle v-if="!automations_edit" :id="view.selected_group" :type="'groups'"></automations-toggle>
                    <automations-table v-if="automations_edit" :id="view.selected_group" :type="'groups'"></automations-table>
                </div>
            </div>

            <div class="mt-2">
                <div class="row mt-1 text-center border-bottom">
                    <div class="block-50 text-left align-middle pb-1 text-blue">
                        <h4>Settings</h4>
                    </div>
                    <div class="block-50 text-right align-middle">

                    </div>
                </div>
                <div class="row mt-1 mb-1 text-center">
                    <div class="block-50 text-left align-middle">
                        Add to home screen
                    </div>
                    <div class="block-50 text-right align-middle">
                        <input type="checkbox" class="toggle" id="fav"><label @click.prevent="addToHomeScreen('groups',view.selected_group)" for="fav"></label>
                    </div>
                </div>
                <div class="row mt-3 mb-1 text-center">
                    <div class="block-50 text-left align-middle">

                    </div>
                    <div class="block-50 align-middle text-right">
                        <a class="btn delete" @click.prevent="deleteGroup()"><i class="fas fa-times mr-1"></i> Delete Group</a>
                    </div>
                </div>

            </div>

            <div class="p-5">
            </div>

        </div>
    </div>
</template>

<script>


    import { mapState } from 'vuex'
    import favorites from '../views/favorite.js'

    export default {

        name: 'groups',
        data(){
            return {
                scene_edit:false,
                light_edit:false,
                automations_edit:false,
                scene_name:'',
                show_scene_name:false,
                scene_saved:false,
                new_scene_saved:false,
                new_group_name:''
            }
        },
        computed: mapState([
            'groups',
            'lights',
            'view'
        ]),
        watch: {
            view: {
                handler: function(newValue,oldValue) {
                    this.chkFavorites()
                },
                deep: true
            }
        },
        methods: {
            showPopup(){
                this.$store.dispatch('updateView',{obj:'popup', val:'manage_lights'})
            },
            openAddAutomation(){
                this.$store.dispatch('updateView',{obj:'popup', val:'add_automation'})
            },
            deleteGroup(){

                var prompt = confirm('Are you sure you want to delete this group?')

                if (prompt){
                    let payload = {
                        method:'DELETE',
                        url:'groups/'+this.view.selected_group,
                    }

                    this.$store.dispatch('call',payload)
                    .then(res => {

                        let payload = {
                            method:'GET',
                            url:'init/groups'
                        }
                        this.$store.dispatch('hacpCall',payload)
                        .then(res2 => {
                            this.$store.dispatch('updateView',{obj:'selected_group', val:''})
                        })

                    })
                }

            },
            saveNewGroup(){

                let payload = {
                    method:'POST',
                    url:'groups',
                    data:{
                        name:this.new_group_name
                    }
                }

                this.$store.dispatch('call',payload)

                .then(res => {

                    let payload = {
                        method:'GET',
                        url:'init/groups'
                    }
                    this.$store.dispatch('hacpCall',payload)
                    .then(res2 => {
                        this.$store.dispatch('updateView',{obj:'selected_group', val:res.data[0].success.id})
                    })

                })

            },
            saveScene(scid){

                if (scid == 'new'){
                    // POST /api/<apikey>/groups/<group_id>/scenes
                    this.scene_edit = true
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
                            this.new_scene_saved = true

                            setTimeout(()=>{
                                this.new_scene_saved = false
                            },2000)

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
                    .then(res => {
                        this.scene_saved = true
                        setTimeout(()=>{
                            this.scene_saved = false
                        },2000)

                    })

                }
            },

            chkFavorites(){
                if (localStorage.getItem('favorites')){
                    var count_data = JSON.parse(localStorage.getItem('favorites'))

                    if (count_data.groups && count_data.groups.indexOf(this.view.selected_group) >= 0){
                        document.getElementById('fav').checked = true
                    } else {
                        document.getElementById('fav').checked = false
                    }
                }
            }

        },
        created() {
            this.addToHomeScreen = favorites.addToHomeScreen
        },
        mounted () {
            this.chkFavorites()

        }

    }

</script>
