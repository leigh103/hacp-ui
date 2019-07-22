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
                <div class="grid col-3 m-1" v-show="success === false">
                    <div class="number" @click.prevent="press($event, num)" v-for="num in [1,2,3,4,5,6,7,8,9]">{{num}}</div>
                    <div class="number" @click.prevent="press($event, 'cancel')">Cancel</div>
                    <div class="number" @click.prevent="press($event, 0)">0</div>
                    <div class="number" @click.prevent="press($event, 'set')">Set</div>
                </div>
                <div class="row">
                    <div v-show="success === true" style="width: 10em" class="block-10 text-center">
                        <div id="trigger" class="trigger"></div>
                        <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        	 viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">
                        <path class="circ path" style="fill:none;stroke:rgb(108, 213, 99);stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" d="
                        	M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
                        	/>
                        <polyline class="tick path" style="fill:none;stroke:rgb(108, 213, 99);stroke-width:3;stroke-linejoin:round;stroke-miterlimit:10;" points="
                        	11.6,20 15.9,24.2 26.4,13.8 "/>
                        </svg>
                    </div>
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
                failure:false
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
            press(event, num){

                if (parseInt(num)){

                    let payload = {
                        file:'Button-beep-tone.mp3'
                    }
                    this.$store.dispatch('playAudio',payload)

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

                        if (res.status == 200){
                            this.success = true
                            setTimeout(()=>{
                                document.getElementById('trigger').classList.add('drawn');
                            },500)
                        }

                        setTimeout(()=>{
                            this.$store.dispatch('updateView',{obj:'popup'})
                            this.failure = false
                            this.success = false
                        },2500)

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
