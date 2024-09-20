const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const shoppingList = [];

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("shopping list", shoppingList);

  socket.on("add item", (item) => {
    shoppingList.push(item);
    io.emit("shopping list", shoppingList);
  });

  socket.on("remove item", (index) => {
    shoppingList.splice(index, 1);

    io.emit("shopping list", shoppingList);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
