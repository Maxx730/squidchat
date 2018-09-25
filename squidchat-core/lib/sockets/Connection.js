
let Connection = function(io){
    console.log("INITIALIZED CONNECTION SOCKET");

    io.on('connection',(socket) => {
        socket.on('Test',(msg) => {
            io.emit('Message Sent',msg)
        });

        socket.on('ToggleType',(val) => {
            io.emit('ChangeTyping',val);
        })
    });

    io.listen(3001);
}

module.exports = Connection;