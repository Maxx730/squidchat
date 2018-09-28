import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:3001");

let Connector = function(UpdateCallback,TypingCallBack,UsersCallback,UserCallback,Notify,VideoCallback,CookieCallback){
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
        CookieCallback();
    })

    socket.on('JoinedUser',(user) => {
        Notify("User has Joined")
    })

    socket.on('UserDisconnected',(user) => {
        Notify("User has Left")
    })

    socket.on('ChangeVideo',(video) => {
        VideoCallback(video)
    })

    socket.on('BeginPlay',(video) => {
        VideoCallback(video)
    })

    socket.on('PausePlay',(video) => {
        VideoCallback(video)
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

Connector.prototype.EmitPlayingVideo = () => {
    socket.emit('PlayVideo')
}

Connector.prototype.EmitPausingVideo = () => {
    socket.emit('PauseVideo')
}

Connector.prototype.EmitSetVideo = (video) => {
    socket.emit('SetVideo',video)
}

export default Connector