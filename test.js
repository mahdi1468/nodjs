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
  to: 'mi1468@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});