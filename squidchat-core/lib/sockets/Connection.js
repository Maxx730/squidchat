


let User = function(id){
    return{
        UserId:id,
        Username:"Anonymous"
    }
}

User.prototype.setVals = (_id,username) => {
    this.UserId = _id;
    this.username = username;
}

let Connection = function(io){
    this.Users = new Array();
    this.Messages = new Array();


    let sql = require('../db/database.js');
    this.conn = new sql();

    console.log("INITIALIZED CONNECTION SOCKET");

    io.on('connection',(socket) => {
        //Whenever a user joins the chatroom they need to request to be added to
        //the session i.e the array of joined users.
        socket.on('JoinSessionRequest',(User) => {

            this.Users.push({
                _id:User._id,
                Username:User.Username,
                SocketId:socket.id,
                Nickname:User.Nickname
            })

            io.emit('JoinedUser',{Users:this.Users,User:User})
        })

        //Listen for messages here,
        socket.on('MessageSent',(Message) => {
            Message._id = this.Messages.length;
            this.Messages.push(Message)

            //Next we want to emit all the messages to everyone in the chat.
            io.emit('IncomingMessage',Message)
        })

        socket.on('ImageMessageSent',(Message) => {
            Message._id = this.Messages.length;
            this.Messages.push(Message)

            //Next we want to emit all the messages to everyone in the chat.
            io.emit('IncomingMessage',Message)
        })

        socket.on('RefreshUsers',(Users) => {
            this.Users = Users.Users
            io.emit('UserList',this.Users)
        })

        socket.on('disconnect',() => {
            for(let i = 0;i < this.Users.length;i++){
                if(this.Users[i].SocketId == socket.id){
                    this.Users.splice(i,1);
                }
            }
        })
    });

    io.listen(3001);
}

module.exports = Connection;