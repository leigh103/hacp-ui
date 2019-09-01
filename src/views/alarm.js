
    export default {
        selectAlarm(key){
            this.$store.dispatch('updateView',{obj:'selected_alarm', val:key})
        },
        setAlarm(key){
            this.$store.dispatch('updateView',{obj:'selected_alarm', val:key})
            this.$store.dispatch('updateView',{obj:'popup', val:'set_alarm'})
        }
    }
