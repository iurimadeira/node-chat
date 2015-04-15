var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

io.on("connection", function(socket){
	var username;

	socket.on("user connected", function(name){
		username = name;
		console.log(name + " connected.");
		io.emit("user connected", username);
	});

	socket.on("chat message", function(msg){
		console.log("message: " + msg);
		io.emit("chat message", msg);
	});

	socket.on("user typing", function(){
		io.emit("user typing", username);
	});

	socket.on("disconnect", function(socket){
		console.log(username + " disconnected.");
		io.emit("user disconnected", username);
	});
});

http.listen(3000, function(){
	console.log("Listening on " + 3000);
});