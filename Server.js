var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "finefitting04@gmail.com",
        pass: "Finefitting@123"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.end("ok");
});

app.get('/send',function(req,res){
  let body = "Message: " + req.query.text + " Email Address: " + req.query.to;

  const mailOptions={
      to : "mpurohit88@gmail.com",
      subject : req.query.subject,
      text : body
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

/*--------------------Routing Over----------------------------*/

app.listen(process.env.PORT || 3001,function(){
    const port = process.env.PORT || 3000;
    console.log("Express Started on Port " + port);
});