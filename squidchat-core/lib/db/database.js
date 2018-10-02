let mysql = require('mysql')

let DatabaseConnection = function(){
    console.log("INITIALIZED DATABASE CONNECTION")
    this.conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'squidchat'
    });

    this.conn.connect((err) => {
        if(err){
            throw err;
        }
    })
}

DatabaseConnection.prototype.CheckLogin = function(User){
    this.conn.query("SELECT username,_id FROM user WHERE username='"+User.Username+"' AND password='"+User.Password+"'",(err,result,fields) => {
        if(!err){
            if(result.length > 0){
                return result[0]
            }
        }else{
            throw err
        }
    })
}

DatabaseConnection.prototype.AvailibilityCheck = function(User,callback){
    this.conn.query("SELECT username,_id FROM user WHERE username='"+User.Username+"'",(err,result,fields) => {
        if(!err){
            if(result.length == 0){
                let create = this.CreateUser(User,(result) => {
                    callback(result)
                })
            }else{
                callback({
                    TYPE:"ERROR",
                    MESSAGE:"USERNAME TAKEN"
                })
            }
        }else{

        }
    })
}

DatabaseConnection.prototype.CreateUser = function(User,callback){
    this.conn.query('INSERT INTO user(username,password) VALUES("'+User.Username+'","'+User.Password+'")',(err,result,fields) => {
        if(!err){
            callback({
                    TYPE:"SUCCESS",
                    PAYLOAD:result
                });
        }else{
            callback({
                TYPE:"QUERY ERROR"
            });
        }
    })
}

module.exports = DatabaseConnection;
