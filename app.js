const express = require('express');
const app = express();

const socketio = require('socket.io');
const http = require('http');
const path = require('path');

// need http server to use socketio
// its present in node modules

const server = http.createServer(app);
const io = socketio(server); // it will return io to be used in future

// setup ejs as view engine
app.set("view engine", "ejs");

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// connection event
io.on("connection", function(socket){
        socket.on("send-location", function (data) {
            io.emit("receive-location", {id: socket.id, ...data});
        });
        
        socket.on("disconnect", function(){
            io.emit("user-disconnected", socket.id);
        })
})

// creating a route (/)
app.get("/", function(req, res) {
    //res.send("hey");
    res.render("index");
})

server.listen(3000);