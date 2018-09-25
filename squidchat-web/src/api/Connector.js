import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3001");

let Connector = function(UpdateCallback,TypingCallBack){
    this.Messages = new Array();
    //Connect to the server.
    socket.emit('connect',(socket) => {

    });

    socket.on('Message Sent',(msg) => {
        console.log(msg)
        this.Messages.push(msg)
        UpdateCallback(this.Messages)
    })

    socket.on('ChangeTyping',(val) => {
        TypingCallBack(val);
    })
}

Connector.prototype.SendTest = (values) => {
    socket.emit('Test',values);
}

Connector.prototype.ShowTyping = (value) => {
    socket.emit('ToggleType',value);
}

export default Connector