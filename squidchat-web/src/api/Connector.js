import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:3001");

let Connector = function(UpdateCallback,TypingCallBack,UsersCallback,UserCallback,Notify){
    this.Messages = new Array();
    this.Users = new Array();
    //Connect to the server.
    socket.emit('connect',(socket) => {

    });

    socket.on('InitializeUser',(User) => {
        UserCallback(User)
    })

    socket.on('Message Sent',(msg) => {
        this.Messages = msg;
        UpdateCallback(this.Messages)
    })

    socket.on('ChangeTyping',(val) => {
        TypingCallBack(val);
    })

    socket.on('AllUsers',(Users) => {
        UsersCallback(Users)
    })

    socket.on('JoinedUser',(user) => {
        Notify("User has Joined")
    })

    socket.on('UserDisconnected',(user) => {
        Notify("User has Left")
    })
}

Connector.prototype.SendTest = (values) => {
    socket.emit('Test',values);
}

Connector.prototype.ShowTyping = (value) => {
    socket.emit('ToggleType',value);
}

Connector.prototype.EmitNameChange = (User) => {
    socket.emit('UpdateUsername',User);
}

Connector.prototype.EmitVote = (message) => {
    socket.emit('UpdateMessageVote',message);
}

export default Connector