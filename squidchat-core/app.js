
let express = require('express');
let app = express();
let http = require('http').Server(app)
let socketio = require('socket.io')(http);

//REQUIRE SOCKETS HERE.
let Connection = require('./lib/sockets/Connection')(socketio);

module.exports = app;
