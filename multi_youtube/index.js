var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.set('port',process.env.PORT || 3000);

var clients = [];

io.on("connection",function(socket){
	var currentUser;
	
	socket.on("USER_CONNECT",function(){
		console.log("user connected");
		for(var i=0;i<clients.lenght;i++){
			
			
		
		
		