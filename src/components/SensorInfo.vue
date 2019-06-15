<template>
    <div class="" v-if="sensor">
        <p>{{ sensor.name }}</p>
        <p v-for="stat in getStats">{{stat.name}}: {{stat.val}}</p>
    </div>
</template>

<script>

    module.exports = {
        props: ['sensor'],
        data() {
            return {
                stats:[],
            }
        },
        computed: {
            getStats(){

                if (this.sensor.type == 'Daylight'){
                    this.stats = [
                        {name:'status',val:this.sensor.state.status},
                        {name:'daylight',val:this.sensor.state.daylight},
                        {name:'dark',val:this.sensor.state.dark}
                    ]
                } else if (this.sensor.type == 'ZHATemperature'){
                    this.stats = [
                        {name:'temperature',val:this.sensor.state.temperature}
                    ]
                } else if (this.sensor.type == 'ZHAPresence'){
                    this.stats = [
                        {name:'presence',val:this.sensor.state.presence}
                    ]
                } else if (this.sensor.type == 'ZHALightLevel'){
                    this.stats = [
                        {name:'lightlevel',val:this.sensor.state.lightlevel},
                        {name:'lux',val:this.sensor.state.lux},
                        {name:'dark',val:this.sensor.state.dark},
                        {name:'daylight',val:this.sensor.state.daylight}
                    ]
                }

                return this.stats

            }
        }
    }

</script>
