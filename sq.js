var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "acqol"
});



var express = require('express');
var app = express();
var mysql = require
var path = require('path');

var bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.post('/getAllData',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM survey_32", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result)
        });
      });
})

app.post('/getData',function(req,res){
    console.log('******************');
    console.log(req.param('data'));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    con.connect(function(err) {
        if (err) throw err;
        var query = "SELECT ";
        var data = req.param('data');
        for(var i=0; i<data.length; i++){
            if(i>0){
                query += ', ';
            }
            query += data[i];
        }
        query += ' FROM acqol.survey_32';
        console.log(query);
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result)
        });
      });
})

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
