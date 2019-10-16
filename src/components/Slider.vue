<template>
    <div class="px-1">

        <div v-if="type == 'bri'" class="btn-color-wrap">
            <div class="btn-color" :class="{'selected':lights[light].state.bri >= 0 && lights[light].state.bri < 75}" style="background-color:rgba(0, 221, 235,0.2)" @click.prevent="changeLight('bri',50)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.bri >= 75 && lights[light].state.bri < 125}" style="background-color:rgba(0, 221, 235,0.4)" @click.prevent="changeLight('bri',100)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.bri >= 125 && lights[light].state.bri < 175}" style="background-color:rgba(0, 221, 235,0.6)" @click.prevent="changeLight('bri',150)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.bri >= 175 && lights[light].state.bri < 225}" style="background-color:rgba(0, 221, 235,0.8)" @click.prevent="changeLight('bri',200)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.bri >= 225 && lights[light].state.bri <= 255}" style="background-color:rgba(0, 221, 235,1)" @click.prevent="changeLight('bri',255)"></div>
        </div>

        <div v-else-if="lights[light].state.ct" class="btn-color-wrap">
            <!-- <input type="range" name="color-temp" step="10" v-model="lights[light].state.ct" :min="lights[light].ctmin" :max="lights[light].ctmax"  @change="changeLight()"> -->
            <div class="btn-color" :class="{'selected':lights[light].state.ct >= 347 && lights[light].state.ct <= 353}" style="background-color:rgb(243, 210, 183)" @click.prevent="changeLight('ct',350)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.ct >= 317 && lights[light].state.ct <= 323}" style="background-color:rgb(252, 232, 220)" @click.prevent="changeLight('ct',320)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.ct >= 295 && lights[light].state.ct <= 301}" style="background-color:rgb(255, 246, 235)" @click.prevent="changeLight('ct',298)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.ct >= 277 && lights[light].state.ct <= 283}" style="background-color:rgb(250, 250, 252)" @click.prevent="changeLight('ct',280)"></div>
            <div class="btn-color" :class="{'selected':lights[light].state.ct >= 267 && lights[light].state.ct <= 273}" style="background-color:rgb(235, 254, 252)" @click.prevent="changeLight('ct',270)"></div>
        </div>

        <div v-else-if="lights[light].state.colormode">

            <div class="btn-color-wrap mb-1">
                <!-- <input type="range" name="color-temp" step="10" v-model="lights[light].state.ct" :min="lights[light].ctmin" :max="lights[light].ctmax"  @change="changeLight()"> -->
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 347 && lights[light].state.ct <= 353}" style="background-color:rgb(243, 210, 183)" @click.prevent="changeLight('ct',350)"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 317 && lights[light].state.ct <= 323}" style="background-color:rgb(252, 232, 220)" @click.prevent="changeLight('ct',320)"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 295 && lights[light].state.ct <= 301}" style="background-color:rgb(255, 246, 235)" @click.prevent="changeLight('ct',298)"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 277 && lights[light].state.ct <= 283}" style="background-color:rgb(250, 250, 252)" @click.prevent="changeLight('ct',280)"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 267 && lights[light].state.ct <= 273}" style="background-color:rgb(235, 254, 252)" @click.prevent="changeLight('ct',270)"></div>
            </div>

            <div class="btn-color-wrap">
                <!-- <input type="range" name="color-temp" step="10" v-model="lights[light].state.ct" :min="lights[light].ctmin" :max="lights[light].ctmax"  @change="changeLight()"> -->
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 347 && lights[light].state.ct <= 353}" style="background-color:rgb(255,0,84)" @click.prevent="changeLight('xy','255,0,84')"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 317 && lights[light].state.ct <= 323}" style="background-color:rgb(0,255,94)" @click.prevent="changeLight('xy','0,255,94')"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 295 && lights[light].state.ct <= 301}" style="background-color:rgb(0,117,255)" @click.prevent="changeLight('xy','0,117,255')"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 277 && lights[light].state.ct <= 283}" style="background-color:rgb(255,61,247)" @click.prevent="changeLight('xy','255,61,247')"></div>
                <div class="btn-color" :class="{'selected':lights[light].state.ct >= 267 && lights[light].state.ct <= 273}" style="background-color:rgb(8,255,229)" @click.prevent="changeLight('xy','8,255,229')"></div>
            </div>
        </div>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        props: ['light','type'],
        data: function () {
            return {
                colors:[
                    'red',
                    'yellow',
                    'blue',
                    'green'
                ]
            }
        },
        computed: mapState([
            'lights'
        ]),
        methods: {
            changeLight(type, val){

                if (type == 'ct' && val) {

                    let payload = {
                        method:'put',
                        url:'lights/'+this.light+'/state',
                        data:{
                            ct:val
                        }
                    }
// console.log(payload)
// return false
                    this.$store.dispatch('call',payload)
                        .then(res => {
                        //    console.log(res)
                        })

                } else if (type == 'bri' && val) {

                    let payload = {
                        method:'put',
                        url:'lights/'+this.light+'/state',
                        data:{
                            bri:val
                        }
                    }
// console.log(payload)
// return false
                    this.$store.dispatch('call',payload)
                        .then(res => {
                        //    console.log(res)
                        })

                } else if (type == 'xy' && val) {

                    val = this.rgbToXy(val)

                    let payload = {
                        method:'put',
                        url:'lights/'+this.light+'/state',
                        data:{
                            xy:val
                        }
                    }
// console.log(payload)
// return false
                    this.$store.dispatch('call',payload)
                        .then(res => {
                        //    console.log(res)
                        })

                }

            },
            rgbToXy(val){

                val = val.split(',')
                var red = val[0]
                var green = val[1]
                var blue = val[2]

                //Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
                red 	= (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
                green 	= (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
                blue 	= (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

                //RGB values to XYZ using the Wide RGB D65 conversion formula
                var X 		= red * 0.664511 + green * 0.154324 + blue * 0.162028;
                var Y 		= red * 0.283881 + green * 0.668433 + blue * 0.047685;
                var Z 		= red * 0.000088 + green * 0.072310 + blue * 0.986039;

                //Calculate the xy values from the XYZ values
                var x 		= (X / (X + Y + Z)).toFixed(4);
                var y 		= (Y / (X + Y + Z)).toFixed(4);

                if (isNaN(x))
                    x = 0;
                if (isNaN(y))
                    y = 0;
                return [parseFloat(x), parseFloat(y)];
            }
        },
        mounted(){

        }
    }

</script>

<style lang="stylus">

$color-green = #09cda6;
$color-blue = #00DCEA;
$color-led-on = $color-blue;
$color-led-off = #222;
$color-led-warn = #cd9109;
$color-led-replace = #cd0956;

input[type="range"]:not(.circular) {
    margin: auto;
    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    height: 0.5em;
    top: -2px;
    padding:0;
    width: 100%;
    cursor: pointer;
    border-radius: 0.2em;
    border: none;
    background: #111;
    transition: all 1s ease;
}

input[type="range"]:not(.circular)::-webkit-slider-runnable-track {
    background: #222;
}

input[type="range"]:not(.circular)::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    height: 0;
    width: 0;
    border-radius: 0.5em;
    background: #fff;
    box-shadow: -100vw 0 0 100vw $color-led-on;
    transition: all 1s ease;
}

input[type="range"]:not(.circular)::-moz-range-track {
    height: 40px;
    background: #111111;
}

input[type="range"]:not(.circular)::-moz-range-thumb {
    background: #111;
    height: 40px;
    width: 20px;
    box-shadow: -100vw 0 0 100vw $color-led-on;
    box-sizing: border-box;
}

input[type="range"]:not(.circular)::-ms-fill-lower {
    background: $color-led-on;
}

input[type="range"]:not(.circular)::-ms-thumb {
    background: #8b8b8b;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
}

input[type="range"]:not(.circular)::-ms-ticks-after {
    display: none;
}

input[type="range"]:not(.circular)::-ms-ticks-before {
    display: none;
}

input[type="range"]:not(.circular)::-ms-track {
    background: #8b8b8b;
    color: transparent;
    height: 40px;
    border: none;
}

input[type="range"]:not(.circular)::-ms-tooltip {
    display: none;
}

.range-slider-circular {
    position: relative;
    width: 15rem;
    height: 15rem;
}

.range-slider-circular input[type="range"].circular {
	bottom: 0;
    left: 0;
	height: 100%;
    width: 100%;
	margin: auto;
	position: absolute;
	transform: rotate(-45deg);
    opacity: 0;
}

.range-slider-circular .slider {
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: auto;
    position: absolute;
    background: none;
    -webkit-box-shadow: inset 0px 0px 0px 1em rgba(255,255,255,0.75);
    -moz-box-shadow: inset 0px 0px 0px 1em rgba(255,255,255,0.75);
    box-shadow: inset 0px 0px 0px 1em rgba(255,255,255,0.75);
    border-radius: 50%;
    pointer-events: none;
}

.range-slider-circular .slider:after {
    content: '';
    display: block;
    position: absolute;
    height: 50%;
    left: 50%;
    bottom: 50%;
    width: 2px;
    background-color: red;
}


</style>
