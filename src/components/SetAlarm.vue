<template>
    <div class="popup">

        <div class="popup-content" id="popup-content">
            <div class="row">
                <div class="block-50">
                    <h3 class="inline">Set Alarm</h3>

                </div>
                <div class="block-50 text-right">
                    <a class="btn close" @click.prevent="closePopup()"><i class="fas fa-times"></i></a>
                </div>
            </div>
            <div class="py-3 text-center">
                <div class="grid col-3 m-1" v-show="countdown_val == 0">
                    <div class="number" @click.prevent="press($event, num)" v-for="num in [1,2,3,4,5,6,7,8,9]">{{num}}</div>
                    <div class="number" @click.prevent="press($event, 'cancel')">Cancel</div>
                    <div class="number" @click.prevent="press($event, 0)">0</div>
                    <div class="number" @click.prevent="press($event, 'set')">Set</div>
                </div>

                    <div v-show="countdown_val > 0" class="p-1 text-center">
                        <div class="countdown" v-text="countdown_val"></div>
                    </div>

            </div>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import Socket from "../socket.js"

    export default {

        name: 'set-alarm',
        data(){
            return {
                alarm_code: '',
                success:false,
                failure:false,
                countdown_val: 0
            }
        },
        computed: mapState([
                'alarm',
                'view'
            ]),
        methods: {
            closePopup(){
                this.$store.dispatch('updateView',{obj:'popup'})
            },
            countDown(){
                this.countdown_val--
                if (this.countdown_val > 0){
                    setTimeout(()=>{
                        this.countDown()
                    },1000)
                } else {
                    this.$store.dispatch('updateView',{obj:'popup'})
                }
            },
            press(event, num){

                if (parseInt(num)){

                    // let payload = {
                    //     file:'Button-beep-tone.mp3'
                    // }
                    // this.$store.dispatch('playAudio',payload)

                    this.alarm_code += num
                    event.target.classList.add('pressed')
                    setTimeout(function(){
                        event.target.classList.remove('pressed')
                    },500)

                } else if (num == 'set'){

                    var data = {
                        type: 'check',
                        code: this.alarm_code,
                        method: 'post',
                        key:this.view.selected_alarm
                    }

                    this.$store.dispatch('hacpCall',{method:'post', url:'alarm',data: data})
                    .then(res => {

                        this.alarm_code = ''

                        this.$store.dispatch('getEntities','alarm')
                            .then(res2 => {
                                if (res.status == 200){
                                    this.countdown_val = 30
                                    this.countDown()
                                } else {
                                    this.$store.dispatch('updateView',{obj:'popup'})
                                }
                            })

                    }).catch(res => {

                        this.alarm_code = ''
                        document.getElementById('popup-content').classList.add('shake');

                    })

                } else if (num == 'cancel'){

                    this.alarm_code = ''

                }

            }
        },
        mounted () {
            this.$store.dispatch('getEntities','alarm')
        }

    }

</script>

<style scoped>
.circ{
    opacity: 0;
    stroke-dasharray: 130;
    stroke-dashoffset: 130;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
}
.tick{
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    -webkit-transition: stroke-dashoffset 1s 0.5s ease-out;
    -moz-transition: stroke-dashoffset 1s 0.5s ease-out;
    -ms-transition: stroke-dashoffset 1s 0.5s ease-out;
    -o-transition: stroke-dashoffset 1s 0.5s ease-out;
    transition: stroke-dashoffset 1s 0.5s ease-out;
}
.drawn + svg .path{
    opacity: 1;
    stroke-dashoffset: 0;
}


</style>
