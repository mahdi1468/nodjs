var io = require('socket.io')({
	transports: ['websocket'],
});
var md5 = require('md5');
io.attach(4567);
console.log('server started! :)');
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
						socket.emit('sign_in_accept');
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

//forget_pasword
	socket.on('forget_pasword', function(data)
	{
		console.log('forget_pasword');
		


		var mydata = JSON.stringify(data);
		console.log(mydata);
		// parse json
		var jsonParsed = JSON.parse(mydata);

		// access elements

		var email = "'"+jsonParsed.email+ "'";
		

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
					var name ="'"+result[0].name+"'";
					var mony ="'"+result[0].mony+"'";
					
					
					console.log("email");
					//socket.emit('email_tekrari');
					var r = Math.floor(Math.random() * (9999999 - 1) + 1);
					console.log("pas jadid: "+r);
					var x = r.toString() +"hehe";
					console.log("tahesh: "+x);
					x = md5(x);
					console.log("hash shod"+x);
					x = "'"+x+"'";
					
					
					
					
					
							//delete
							  var sql = "DELETE FROM users WHERE email = "+email;
							  con.query(sql, function (err, result)
							{
								if (err) throw err;
								console.log("Number of records deleted: " + result.affectedRows);
							  
							  
							//  add
							  sql = "INSERT INTO users (name, email, pasword, mony) VALUES ("+name+","+email+","+x+","+mony+")";
							  con.query(sql, function (err, result) {
								if (err) throw err;
								console.log("1 record inserted");
							  });
							  
							  
							  
							  
							});
							//send email
							console.log("email hast: "+email);
							
							var nodemailer = require('nodemailer');

							var transporter = nodemailer.createTransport({
							  service: 'gmail',
							  secure: false,
							  port: 25,
							  auth: {
								user: 'mahdi1468@gmail.com',
								pass: '77311377mM'
							  },
							  tls: {
								  rejectUnauthorized: false
							  }
							});

							var mailOptions = {
							  from: 'mahdi1468@gmail.com',
							  to: jsonParsed.email,
							  subject: 'Sending Email using Node.js',
							  text: 'your new pasword is :'+r.toString()	
							};

							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
								console.log(error);
							  } else {
								console.log('Email sent: ' + info.response);
								socket.emit('pas_changed_forget');
							  }
							});
												
					
					
					
					
					
					
				}
				else
				{//email nis
						socket.emit('wrong_email');
						console.log("email nist emaili ke dadi"+email);
				}
		   });
		});

	});
	
	//change_pasword
	socket.on('change_pasword', function(data)
	{
		console.log('change_pasword');
		


		var mydata = JSON.stringify(data);
		console.log(mydata);
		// parse json
		var jsonParsed = JSON.parse(mydata);

		// access elements

		var email = "'"+jsonParsed.email+ "'";
		var new_pas = "'"+jsonParsed.newpasword+ "'";
		var last_pas = "'"+jsonParsed.lastpasword+ "'";

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
					if(result[0].pasword != jsonParsed.lastpasword)
					{
						console.log("wrong last pas");
						socket.emit('wrong_email_or_pasword');
						return;
					}
					var name ="'"+result[0].name+"'";
					var mony ="'"+result[0].mony+"'";
					
					
					console.log("email");
					
					
					
					
					
					
							//delete
							  var sql = "DELETE FROM users WHERE email = "+email;
							  con.query(sql, function (err, result)
							{
								if (err) throw err;
								console.log("Number of records deleted: " + result.affectedRows);
							  
							  
							//  add
							  sql = "INSERT INTO users (name, email, pasword, mony) VALUES ("+name+","+email+","+new_pas+","+mony+")";
							  con.query(sql, function (err, result) {
								if (err) throw err;
								console.log("1 record inserted");
								socket.emit('pas_changed');
							  });
							  
							  
							  
							  
							});
							
					
					
					
					
					
				}
				else
				{//email nis
					//	socket.emit('wrong_up');
						console.log("email nist emaili ke dadi"+email);
						socket.emit('wrong_email_or_pasword');
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
