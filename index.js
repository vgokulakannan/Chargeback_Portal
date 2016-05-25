var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require("mysql");
//var mysql = new Client();
app.use(express.static(__dirname));
app.use(bodyParser.json());

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "192.168.8.91",
  port:3306,
  user: "root",
  password: "P@ssw0rd",
  database : 'chargeback'
});
//Test whether connection created or not 
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db'+err);
    return;
  }
  console.log('Connection established');
});

//Redirect to Home page
app.get('/', function(req, res){
  res.redirect('/index.html');
});


//Send overall usage of all departments
app.get('/getBill',function(req,res){
  var value = 'select * from bill_view';

 con.query(value, function(err, rows, fields) {
  if (!err)
  {
    res.send(rows);
  }
  else
    console.log('Error while performing Query.');
  });
});


//Send usage for particular departments
app.get('/deptBill/:dept_id',function(req,res){

  var deptid = req.params.dept_id;

  var value = 'select * from bill_view b where b.dept_name in (select dept_name from department where dept_id="'+deptid+'")';

 con.query(value, function(err, rows, fields) {
  if (!err)
    {

      res.send(rows);
    }
  else
    console.log('Error while performing Query.');
  });
});


//Login Validation
app.post('/login',function(req,res){

uname = req.body.username;
pswd = req.body.password;

var queries = ' SELECT count(user_id) AS uid FROM users WHERE username ="'+ uname +'" AND pwd= "'+ pswd +'"';
  con.query(queries ,[uname,pswd],function(err,rows) {
        if(err) 
        {
          console.log(err);
        } 
        else 
        {
            if(rows[0].uid == 1)
            {
                var dept_query ='select dept_id from users WHERE username = "'+ uname + '"';
               
                con.query(dept_query,function(err,rows)
                {
                    if(err) 
                    {
                        console.log(err);
                    } 
                    else 
                    {
                      var message = rows[0].dept_id ;
                      res.send("hi "+message);
                    }
                });
            }
          else
          {
            res.send("Invalid username or password");
          }
        }
  });

});


//Add new usage
app.post('/registerservice',function(req,res){
var region=req.body.region;
var service =req.body.service;
var flavor= req.body.flavor;
var total_hours=req.body.tothours;
var dept= req.body.dept;
var queries='SELECT price as amt, price_id as pid from price WHERE region="'+region+'" AND service="'+service +'" AND flavor="'+flavor+'"';
 con.query( queries,[region,service,flavor],function(err,rows){
    if(err)
      res.json({"Error ":true,"Message ":err});
    else{
      var priceId=rows[0].pid;
      var tot_price=total_hours*rows[0].amt;
      var post ={dept_id:dept,price_id:priceId,total_hrs:total_hours,total_price:tot_price};
      con.query('INSERT INTO bill SET ?',post,function(err,row){
        if(err)
          console.log(err);
        else
        {
          res.send("success");
        }
      })
    }
  });

});

app.listen(8081);
console.log("Server Started. Point your browser to 'http://localhost:8081'");