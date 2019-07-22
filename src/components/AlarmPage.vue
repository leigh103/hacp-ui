<template>
    <div>

        <div class="text-left" v-if="view.selected_alarm == 'new'">
            <div class="row">
                <div class="block-50">
                    <h1 class=""><input type="text" class="no-style" v-model="new_alarm_name" placeholder="New Alarm Name..."></h1>
                    <p>Type a new name for the alarm above and click save</p>
                </div>
                <div class="block-50 text-right">
                    <a class="btn save"@click.prevent="saveNewGroup()"><i class="fas fa-save"></i></a>
                </div>
            </div>

        </div>

        <div class="text-left" v-if="view.selected_alarm != 'new' && alarm.alarms && alarm.alarms.length>0 && alarm.alarms[view.selected_alarm]">


            <div class="row">
                <div class="block-50">
                    <h1 class="" v-text="alarm.alarms[view.selected_alarm].name"></h1>
                    <h4 v-text="alarm.alarms[view.selected_alarm].description"></h4>

                </div>
                <div class="block-50 text-right">
                    <button @click.prevent="setAlarm()" class="bg-red"><span v-if="alarm.key === view.selected_alarm">Disarm</span><span v-else>Set Alarm</span></button>
                </div>
            </div>

            <div class="mt-2">

                <div class="row text-center">
                    <div class="block-100 text-center">
                        <div class="row mt-1 text-center border-bottom">
                            <div class="block-50 text-left align-middle pb-1 text-blue">
                                <h4>Settings</h4>
                            </div>
                            <div class="block-50 text-right align-middle">

                            </div>
                        </div>
                        <div class="row mt-1 mb-1 text-center">
                            <div class="block-50 text-left align-middle">
                                Code
                            </div>
                            <div class="block-50 text-right align-middle">
                                <p class="text-bold" v-text="alarm.alarms[view.selected_alarm].code"></p>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="block-50 text-left align-middle">
                                Email Alert
                            </div>
                            <div class="block-50 text-right align-middle">
                                <input type="checkbox" class="toggle" v-model="alarm.alarms[view.selected_alarm].email" id="email"><label for="email"></label>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="block-50 text-left align-middle">
                                Audible Alert
                            </div>
                            <div class="block-50 text-right align-middle">
                                <input type="checkbox" class="toggle" v-model="alarm.alarms[view.selected_alarm].alert" id="audible"><label for="audible"></label>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="p-5">
            </div>

            <div class="mt-2 text-right">
                <a class="btn delete" @click.prevent="deleteAlarm()"><i class="fas fa-times mr-1"></i> Delete Alarm</a>
            </div>

            <div class="p-5">
            </div>

        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'alarm_page',
        data(){
            return {
                new_alarm_name:''
            }
        },
        computed: mapState([
            'alarm',
            'view'
        ]),
        methods: {
            setAlarm(){
                this.$store.dispatch('updateView',{obj:'popup', val:'set_alarm'})
            }

        },
        mounted () {

        }

    }

</script>
