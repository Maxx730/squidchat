let path = require('path')
let express = require('express');
let app = express();
let http = require('http').Server(app)
let socketio = require('socket.io')(http);
const mysql = require('mysql')
let body = require('body-parser');
let cors = require('cors');
let crypto = require('crypto')
let fileUpload = require('express-fileupload')
app.use(body.urlencoded({extended:true}));
app.use(body.json());
app.use(fileUpload())
app.use('/upload', express.static(path.join(__dirname, 'squidchat_upload')))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  });

//REQUIRE SOCKETS HERE.
let Connection = require('./lib/sockets/Connection')(socketio);
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'dRmario',
    database:'squidchat'
});

app.post("/check/login",(req,res) => {
    res.set('Content-Type','application/json');
    conn.query("select _id,username,hash from user where username='"+req.body.Username+"' and password='"+req.body.Password+"'",(err,result,fields) => {
        if(!err){
            if(result.length > 0){
                res.json({
                    TYPE:"SUCCESS",
                    MESSAGE:"LOGIN SUCCESS",
                    PAYLOAD:result[0]
                })
            }else{
                res.json({
                    TYPE:"ERROR",
                    MESSAGE:"USERNAME OR PASSWORD INCORRECT"
                })
            }
            res.end()
        }else{
            res.json({
                TYPE:"ERROR",
                MESSAGE:"ERROR QUERYING DATABASE FOR LOGIN CHECK"
            })
            res.end();
        }
    })
})

app.post('/user/create',(req,res) => {
    let hash = crypto.createHash('md5').update(req.body.username).digest('hex');

    conn.query('select username from user where username="'+req.body.username+'"',(err,result,fields) => {
        if(!err){
            if(result.length == 0){
                conn.query("insert into user(username,password,hash) values('"+req.body.username+"','"+req.body.password+"','"+hash+"')",(err,result,fields) => {
                    if(!err){
                        res.json({
                            TYPE:"SUCCESS",
                            MESSAGE:"CREATED NEW USER",
                            USER:{
                                _id:result.insertId,
                                Username:req.body.username,
                                Hash:hash
                            }
                        })
                    }else{
                        res.json({
                            TYPE:"ERROR",
                            MESSAGE:"ERROR CREATING NEW USER"
                        })
                    }
                    res.end();
                })
            }else{
                res.json({
                    TYPE:"ERROR",
                    MESSAGE:"USERNAME ALREADY EXISTS"
                })
                res.end();
            }
        }else{
            res.json({
                TYPE:"ERROR",
                MESSAGE:"ERROR RUNNING QUERY"
            })
            res.end();
        }
    })
})

app.get('/users',(req,res) => {
    res.set('Content-Type','application/json');
    conn.query("select * from user",(err,result,fields) => {
        if(err){
            res.json({
                TYPE:"ERROR",
                ERROR:err
            })
            res.end();
        }else{
            res.json(result)
            res.end();
        }
    })
})

app.post('/hash/check',(req,res) => {
    res.set('Content-Type','application/json');

    conn.query("select username,_id from user where hash='"+req.body.hash+"'",(err,result,fields) => {
        if(!err){
            if(result.length > 0){
                res.json({
                    TYPE:"SUCCESS",
                    PAYLOAD:result[0]
                })
            }else{
                res.json({
                    TYPE:"ERROR",
                    MESSAGE:"NO INFORMATION MATCHING HASH"
                })
            }
            res.end()
        }else{
            res.json({
                TYPE:"ERROR",
                MESSAGE:"ERROR PULLING HASH INFO FROM DATABASE"
            })
            res.end()
        }
    })
})

app.post('/upload/image',(req,res) => {
    res.set('Content-Type','application/json')
    let image = req.files.file;
    console.log(__dirname)
    let hash = crypto.createHash('md5').update(req.files.file.name).digest('hex');

    image.mv('squidchat_upload/'+hash+'.jpg',(err) => {
        if(!err){
            res.json({
                TYPE:"SUCCESS",
                MESSAGE:"SUCCESFULLY UPLOADED FILE",
                FILE:{
                    path:'upload/'+hash+'.jpg'
                }
            })
        }else{
            res.json({
                TYPE:"ERROR",
                MESSAGE:"ERROR UPLOADING FILE"
            })
        }

        res.end()
    })
})

module.exports = app;
