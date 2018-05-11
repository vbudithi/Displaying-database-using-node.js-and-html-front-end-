var express=require('express')
var bodyParser=require("body-parser")
app=express();

var port=1234;

var root='/public'

app.use(express.static(__dirname+root));



console.log("Listening on port",port);


app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));


app.get("/test",function(request,response){
    var param=request.query.username
    console.log('get requested by'+param)
    response.send('Thank you for requestiong our Get Service')
})
app.post("/test",function(request,response){
    console.log(request.body)
    var data=request.body;
    console.log('post requested, here is the data:'+data)
    response.send('thank you for requesting our post service')
})

app.listen(port);