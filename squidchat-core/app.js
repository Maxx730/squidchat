
let express = require('express');
let app = express();
let http = require('http').Server(app)
let socketio = require('socket.io')(http);

//REQUIRE SOCKETS HERE.
let Connection = require('./lib/sockets/Connection')(socketio);

app.get('/',(req,res) => {
  res.set('Content-Type','application/json');
  res.json({
    TYPE:"WORKING",
    MESSAGE:"TESTING"
  });
  res.end();
})

module.exports = app;
