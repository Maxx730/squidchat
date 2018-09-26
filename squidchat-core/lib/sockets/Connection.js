let User = function(id){
    return{
        UserId:id,
        Username:"Anonymous"
    }
}

let Connection = function(io){
    this.Users = new Array();

    console.log("INITIALIZED CONNECTION SOCKET");

    io.on('connection',(socket) => {
        socket.on('Test',(msg) => {
            io.emit('Message Sent',msg)
        });

        socket.on('ToggleType',(val) => {
            io.emit('ChangeTyping',val);
        })

        let NewUser = new User(socket.id);
        this.Users.push(NewUser);
        io.emit('JoinedUser',NewUser);

        socket.on('disconnect',() => {
            for(let i = 0;i < this.Users.length;i++){
                if(this.Users[i].UserId == socket.id){
                    let User = Users[i];
                    this.Users.splice(i,1);
                    io.emit('UserDisconnected',User)
                }
            }
        })
    });

    io.listen(3001);
}

Connection.prototype.AddUser = () => {

}

module.exports = Connection;