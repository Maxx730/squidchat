class User{
    constructor(){
        return {
            UserId:Math.random(),
            Username:"Anonymous"
        }
    }
}

module.exports.User = User;