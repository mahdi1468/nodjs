// project/app.js
 
var app = require('express')(),
    mailer = require('express-mailer');
 
mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'mahdi1468@gmail.com',
    pass: '77311377mM'
  }
});
 