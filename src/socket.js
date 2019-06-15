import Vue from "vue"

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

    if (msg.data.match(/^\{(.*?)\}$/)){
        var payload = JSON.parse(msg.data)
    } else {
        var payload = msg.data
    }
    // console.log(payload)
    emitter.$emit("message", payload)

}
socket.onerror = function(err){
    emitter.$emit("error", err)
}


export default emitter
