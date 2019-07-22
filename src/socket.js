import Vue from "vue"
import { mapState } from 'vuex'

const socket = new WebSocket("ws://10.0.1.100:6409")

const emitter = new Vue({
    methods:{
        send(message){
            if (1 === socket.readyState)
                socket.send(message)
        }
    }
})

socket.onmessage = function(msg){

    var payload = msg.data

    if (msg.data.match(/^\{(.*?)\}$/)){
        payload = JSON.parse(msg.data)
    }

    emitter.$emit("message", payload)

}
socket.onerror = function(err){
    emitter.$emit("error", err)
}


export default emitter
