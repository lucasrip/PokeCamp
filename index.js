const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000 || process.env.PORT;
app.use("/public", express.static("public", {}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let users = {};
let posts = [];


io.on("connection", (socket) => {
  socket.on("defineUserConfig", (user) => (users[socket.id] = user));

  socket.on("disconnect", () => {
    users[socket.id] = undefined;
    io.emit("ON_USERS_UPDATE", JSON.stringify(users));
  });

  socket.on("ON_USER_MOVE", (newUserValues) => {
    const user = users[socket.id];

    const calcNewPositionX = user.x + (newUserValues.move.x || 0);
    const calcNewPositionY = user.y + (newUserValues.move.y || 0);

    const coltrolPositionX =
      calcNewPositionX > 10 &&
      calcNewPositionX < newUserValues.mapSize.width - 55;

    const coltrolPositionY =
      calcNewPositionY > 40 &&
      calcNewPositionY < newUserValues.mapSize.height - 50;

    user.x = coltrolPositionX ? calcNewPositionX : user.x;
    user.y = coltrolPositionY ? calcNewPositionY : user.y;

    if (newUserValues.lastKey === user.lastKey) {
      user.clickCount = user.clickCount === 0 ? 1 : 0;
    } else user.clickCount = 0;

    user.lastKey = newUserValues.lastKey || "";
    user.level = newUserValues.level;
    io.emit("ON_USERS_UPDATE", JSON.stringify(users));
  });

  socket.on("sendMessage", (data) => {
    posts.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

server.listen(port, () => console.log(`listening on * ${port}`));
