import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:3001");

let Connector = function(MessageCallback,UserCallback,NotificationCallback){
    console.log("INITIALIZING SOCKET CONNECTION...")

    this.Messages = new Array();
    this.Users = new Array();

    //Connect to the server.
    socket.on('IncomingMessage',(Message) => {
        this.Messages.push(Message)
        MessageCallback(this.Messages)
    })

    socket.on('JoinedUser',(User) => {
        this.Users.push(User);
        UserCallback(this.Users)
        NotificationCallback(User.Username)
    })
}

Connector.prototype.JoinSession = (User) => {
    socket.emit('JoinSessionRequest',User)
}

Connector.prototype.SendMessage = (Message) => {
    socket.emit('MessageSent',Message)
}

Connector.prototype.SendImage = (Message) => {
    socket.emit('ImageMessageSent',Message)
}

export default Connector