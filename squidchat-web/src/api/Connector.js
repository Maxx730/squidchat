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

    socket.on('JoinedUser',(payload) => {
        this.Users = payload.Users
        UserCallback(this.Users)
        NotificationCallback(payload.User.Username)
    })

    socket.on('UserList',(Users) => {
        this.Users = Users;
        UserCallback(this.Users)
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

Connector.prototype.RefreshUsers = (Users) => {
    socket.emit('RefreshUsers',Users)
}

export default Connector