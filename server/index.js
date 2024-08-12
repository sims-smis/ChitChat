import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3001", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow credentials
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  //now we can make events here
  // socket.emit("welcome", "Welcome to the server");
  // socket.broadcast.emit("welcome", `A new user has joined the server ${socket.id}`);
  
  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("recieved_message", msg);
    socket.broadcast.to(data.room).emit("recieved_message", data.message);
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected",socket.id);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
