var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

io.on('connection', function(socket)
{
	socket.on('add user', function(data)
	{
		console.log('new user');


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

		var con = mysql.createConnection(
		{
			host: "localhost",
			user: "root",
			password: "77311377m",
			database: "mydb"
		});

		con.connect(function(err)
		{
		  if (err) throw err;
		  console.log("Connected!");

		   con.query("SELECT * FROM users WHERE email = "+email, function (err, result)
		   {
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
					con.query(sql, function (err, result)
					{
						if (err) throw err;
						console.log("1 record inserted");
					});
				}

			});

		});
	});//end sign up

	//sign_in
	socket.on('sign_in', function(data)
	{
		console.log('sign_in');



		var mydata = JSON.stringify(data);
		console.log(mydata);
		// parse json
		var jsonParsed = JSON.parse(mydata);

		// access elements

		var email = "'"+jsonParsed.email+ "'";
		var pasword = "'"+jsonParsed.pasword + "'";

		//sql
		var mysql = require('mysql');

		var con = mysql.createConnection(
		{
			host: "localhost",
			user: "root",
			password: "77311377m",
			database: "mydb"
		});

		con.connect(function(err)
		{
		  if (err) throw err;
		  console.log("Connected!");

		   con.query("SELECT * FROM users WHERE email = "+email, function (err, result)
		   {
				if (err) throw err;
				//aya ghablan sabt shode???
				if(result.length >0)
				{
					console.log("user name hast");
					//socket.emit('email_tekrari');
					if(result[0].pasword == jsonParsed.pasword)
					{
						console.log("vared shod");
					}
					else
					{
							socket.emit('wrong_up');
							console.log("pas vared shode :"+pasword);
							console.log("pas asli :"+result[0].pasword);
					}
				}
				else
				{//user name nist
						socket.emit('wrong_up');
						console.log("user name nist");
				}
		   });
		});

	});



	socket.on('beep', function(){
		  console.log('residddddd');
		//socket.emit('boop');
	});
	socket.on('move', function(data){
   // data.id = thisclaintId;
    console.log("Claint Moved");
   // socket.emit('boop', data);
	});


    //socket.broadcast.emit("move", data);

});
