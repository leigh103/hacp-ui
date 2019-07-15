<template>
    <div class="popup">

        <div class="popup-content">
            <div class="row">
                <div class="block-50">
                    <h3 class="inline">Manage Lights</h3>
                    <p>Tap a light to add or remove it from the <span v-if="groups[view.selected_group].name" v-text="groups[view.selected_group].name"></span> group</p>
                    </p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn" @click.prevent="closePopup()">&times; Done</a>
                </div>
            </div>

            <div class="py-3 text-center">

                <div class="toggle text-left"
                    v-for="(light, key) in lights"
                    :class="{'selected':inArray(groups[view.selected_group].lights, key),'unselected':!inArray(groups[view.selected_group].lights, key)}"
                    @click.prevent="addRemoveLight(key)"
                >
                    <div class="indicator">
                        <div class="led"></div>
                    </div>
                    <div class="name">{{ light.name }}</div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'manage-lights',
        data(){
            return {

            }
        },
        computed: mapState([
                'lights',
                'groups',
                'view'
            ]),
        methods: {
            closePopup(){
                this.$store.dispatch('updateView',{obj:'popup'})
            },
            inArray(arr, val){
                if (typeof arr == 'object' && arr.indexOf(val) !== -1){
                    return true
                } else {
                    return false
                }
            },
            addRemoveLight(val){

                let index = this.groups[this.view.selected_group].lights.indexOf(val)

                if (index !== -1){
                    this.groups[this.view.selected_group].lights.splice(index, 1)
                } else {
                    this.groups[this.view.selected_group].lights.push(val)
                }

                let payload = {
                    method:'put',
                    url:'groups/'+this.view.selected_group,
                    data:{
                        lights:this.groups[this.view.selected_group].lights
                    }
                }

                this.$store.dispatch('call',payload)
                    .then(res => {

                        let payload = {
                            method: 'get',
                            url: 'init/groups/'+this.view.selected_group,
                            id: this.view.selected_group
                        }

                        this.$store.dispatch('hacpCall',payload)
                            .then(res => {
                                console.log(res)
                            })

                    })

            }
        },
        mounted () {

            if (!this.lights){
                this.$store.dispatch('getEntities','lights')
            }

        }
    }

</script>
