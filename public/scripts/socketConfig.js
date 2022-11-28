const pokeArea = document.getElementById("spwanPokeball");
let xp = 0;

const message = document.getElementById("message");
const submit = document.getElementById("submit");

function startGame() {
  var socket = io();

  choiceScreen.style.display = "none";
  gameScreen.style.display = "flex";

  const mapSize = {
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };

  spawnPokeball();

  socket.on("connect", () => {
    const user = {
      id: socket.id,
      ...userConfig,
      x: 70,
      y: 150,
      lastKey: "",
      clickCount: 1,
      level: 1,
    };
    users[socket.id] = user;
    socket.emit("defineUserConfig", user);
    renderUI();
    renderUserConfig(user);
    renderPlayrsOnline(users);
  });

  socket.on("disconnect", () => renderPlayrsOnline(users));

  window.addEventListener("keydown", (e) => {
    const currentLevel = parseInt(
      document.getElementById("currentLevel").innerText
    );
    const user = users[socket.id];
    isGetedPokeball(user);
    renderPlayrsOnline(users);
    const moves = {
      ArrowUp: { x: 0, y: -10 },
      ArrowDown: { x: 0, y: 10 },
      ArrowLeft: { x: -10, y: 0 },
      ArrowRight: { x: 10, y: 0 },
    };

    const move = moves[e.key];

    if (move)
      socket.emit("ON_USER_MOVE", {
        id: socket.id,
        move,
        lastKey: e.key,
        mapSize,
        level: user.level !== currentLevel ? currentLevel : user.level,
      });
  });

  socket.on("receivedMessage", (message) => {
    renderMessage(message);
  });

  submit.addEventListener("click", () => {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const messageConfig = {
      author: users[socket.id].userName,
      message: message.value,
      time,
    };
    socket.emit("sendMessage", messageConfig);
    renderMessage(messageConfig);
    message.value = "";
    console.log(time);
  });

  socket.on("ON_USERS_UPDATE", (updatedUsers) => {
    users = JSON.parse(updatedUsers);
    renderUI();
  });
}
