import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:3001");

let Connector = function(MessageCallback){
    console.log("INITIALIZING SOCKET CONNECTION...")

    this.Messages = new Array();

    //Connect to the server.
    socket.on('IncomingMessage',(Message) => {
        this.Messages.push(Message)
        MessageCallback(this.Messages)
    })
}

Connector.prototype.JoinSession = (User) => {
    socket.emit('JoinSessionRequest',User)
}

Connector.prototype.SendMessage = (Message) => {
    socket.emit('MessageSent',Message)
}

export default Connector