var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

io.on('connection', function(socket){
	socket.on('beep', function(){
		  console.log('residddddd');
		//socket.emit('boop');
	});
	socket.on('move', function(data){
   // data.id = thisclaintId;
    console.log("Claint Moved", JSON.stringify(data));
    socket.emit('boop', data);
  });
	
   
    //socket.broadcast.emit("move", data);
  
})
