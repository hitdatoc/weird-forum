var express = require('express')
var app = express()
var http = require('http').Server(app)
var favicon = require('serve-favicon')

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html')
})

app.get('/index.css', function(request, response){
	response.sendFile(__dirname + '/index.css')
})

app.get('/index.js', function(request, response){
	response.sendFile(__dirname + '/index.js')
})

app.get('/favicon.ico', function(request, response){
	response.sendFile(__dirname + '/favicon.ico')
})

//Bootstrap
app.get('/css/bootstrap.min.css', function(request, response){
	response.sendFile(__dirname + '/css/bootstrap.min.css')
})


http.listen(process.env.PORT || 8888)

if(process.env.PORT){
	console.log('Listening at port:' + process.env.PORT)
} else {
	console.log("Listening on localhost:8888")
}
