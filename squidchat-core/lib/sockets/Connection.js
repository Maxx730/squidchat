let User = function(id){
    return{
        UserId:id,
        Username:"Anonymous"
    }
}

let Connection = function(io){
    this.Users = new Array();
    this.Messages = new Array();

    console.log("INITIALIZED CONNECTION SOCKET");

    io.on('connection',(socket) => {
        io.emit('Message Sent',this.Messages)
        //Create the new user once someone has connected and add them to the user array.
        let NewUser = new User(socket.id);
        this.Users.push(NewUser);
        //Send the new User object back to that user.
        io.to(socket.id).emit('InitializeUser',NewUser);

        socket.on('Test',(msg) => {
            this.Messages.push(msg);
            io.emit('Message Sent',this.Messages)
        });

        socket.on('ToggleType',(val) => {
            io.emit('ChangeTyping',val);
        })

        socket.on('UpdateUsername',(User) => {
            console.log(User);
            for(let i = 0;i < this.Users.length;i++){
                if(this.Users[i].UserId === User.UserId){
                    this.Users[i].Username = User.Username
                    io.emit('AllUsers',this.Users);
                }
            }

            console.log(this.Messages)
            for(let i = 0;i < this.Messages.length;i++){
                if(this.Messages[i].User.UserId == User.UserId){
                    this.Messages[i].User = User;
                    io.emit('Message Sent',this.Messages)
                }
            }
        })

        socket.on('UpdateMessageVote',(Message) => {
            for(let i = 0;i < this.Messages.length;i++){
                if(this.Messages[i]._id == Message._id){
                    this.Messages[i] = Message
                }
            }

            io.emit('Message Sent',this.Messages)
        })

        io.emit('JoinedUser',NewUser);
        io.emit('AllUsers',this.Users);

        socket.on('disconnect',() => {
            for(let i = 0;i < this.Users.length;i++){
                if(this.Users[i].UserId == socket.id){
                    let User = Users[i];
                    this.Users.splice(i,1);
                    io.emit('UserDisconnected',User)
                    io.emit('AllUsers',this.Users)
                }
            }
        })
    });

    io.listen(3001);
}

module.exports = Connection;