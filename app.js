const express = require('express');
const app = express();

const socketio = require('socket.io');
const http = require('http');

// need http server to use socketio
// its present in node modules

const server = http.createServer(app);
const io = socketio(server); // it will return io to be used in future

// setup ejs as view engine
app.set("view engine", "ejs");

// setup static files
app.set(express.static(path.join(__dirname, "public")));

// creating a route (/)
app.get("/", function(req, res) {
    res.send("hey");
})

server.listen(3000);