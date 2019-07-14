<template>
    <div class="px-1">

        <input type="range" name="brightness" v-model="lights[light].state.bri" min="0" max="255" v-if="type == 'bri'">

        <input type="range" name="color-temp" v-model="lights[light].state.ct" :min="lights[light].ctmin" :max="lights[light].ctmax" v-else-if="type == 'ct'">

        <div class="color-pallet" v-else-if="type == 'xy'">
            <div v-for="color in colors">
                <div :style="{'background-color':color}"></div>
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

        },
        mounted(){

        }
    }

</script>

<style lang="stylus">

$color-led-on = rgb(80, 240, 168);
$color-led-off = #888;
$color-led-warn = rgb(240, 176, 80);
$color-led-replace = rgb(240, 85, 80);

input[type="range"]:not(.circular) {
    margin: auto;
    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    height: 10px;
    padding:0;
    width: 100%;
    cursor: pointer;
    border-radius: 0.5em;
    border: none;
    background: #8b8b8b;
    transition: all 1s ease;
}

input[type="range"]:not(.circular)::-webkit-slider-runnable-track {
    background: #aaa;
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
    background: #8b8b8b;
}

input[type="range"]:not(.circular)::-moz-range-thumb {
    background: #8b8b8b;
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
