import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3001");

let Connector = function(UpdateCallback,TypingCallBack){
    this.Messages = new Array();
    //Connect to the server.
    socket.emit('connect',(socket) => {

    });

    socket.on('Message Sent',(msg) => {
        this.Messages.push(msg)
        UpdateCallback(this.Messages)
    })

    socket.on('ChangeTyping',(val) => {
        TypingCallBack(val);
    })

    socket.on('JoinedUser',(user) => {
        this.Messages.push({
            User:{
                Username:"System"
            },
            Message:user.Username + " has connected!"
        });
        UpdateCallback(this.Messages);
    })

    socket.on('UserDisconnected',(user) => {
        this.Messages.push({
            User:{
                Username:"System"
            },
            Message:user.Username + " has disconnected!"
        });
        UpdateCallback(this.Messages);
    })
}

Connector.prototype.SendTest = (values) => {
    socket.emit('Test',values);
}

Connector.prototype.ShowTyping = (value) => {
    socket.emit('ToggleType',value);
}

export default Connector