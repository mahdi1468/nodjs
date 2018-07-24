var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

io.on('connection', function(socket){
	socket.on('add user', function(data){
	console.log('new user');
	//var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
	
	var mydata = JSON.stringify(data);
	console.log(mydata);
	// parse json
	var jsonParsed = JSON.parse(mydata);
	
	// access elements
	var name =  "'"+jsonParsed.name+ "'";
	var email = "'"+jsonParsed.email+ "'";
	var pasword = "'"+jsonParsed.pasword + "'";

	//sql
	var mysql = require('mysql');

	var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "77311377m",
	database: "mydb"
	});

	con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
   con.query("SELECT * FROM users WHERE email = "+email, function (err, result) {
    if (err) throw err;
	//aya ghablan sabt shode???
	if(result.length >0)
	{
		console.log("email tekrari ast");
		socket.emit('email_tekrari');
	}
	else
	{
		var sql = "INSERT INTO users (name, email, pasword, mony) VALUES (" +name+"," + email+"," +pasword+",0)";
		con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		});
	}
    
	
  
  
  //var sql = "INSERT INTO users (name, email, pasword, mony) VALUES ('Company Inc', 'Highway 37','pas',200)";
  
	
  });
  
});


	
	
	
	
	
	});
	socket.on('beep', function(){
		  console.log('residddddd');
		//socket.emit('boop');
	});
	socket.on('move', function(data){
   // data.id = thisclaintId;
   // console.log("Claint Moved", JSON.stringify(data));
   // socket.emit('boop', data);
  });
	
   
    //socket.broadcast.emit("move", data);
  
})
