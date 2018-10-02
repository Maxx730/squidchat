let Video = (socket,io) => {

    this.FocusedVideo = {
        _id:"",
        paused:true,
        playing:false
    }

    socket.on('SetVideo',(video) => {
        this.FocusedVideo = video

        //Then we want to push out to all of the chats
        //the new focused video.
        io.emit('ChangeVideo',this.FocusedVideo);
    })

    socket.on('PlayVideo',() => {
        this.FocusedVideo.paused = false;
        this.FocusedVideo.playing = true;

        io.emit('BeginPlay',this.FocusedVideo)
    })

    socket.on('PauseVideo',() => {
        this.FocusedVideo.paused = true;
        this.FocusedVideo.playing = false;

        io.emit('PausePlay',this.FocusedVideo)
    })
}

module.exports = Video