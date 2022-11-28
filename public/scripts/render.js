const canvas = document.getElementById("canvas");
let users = {};
let user = undefined;

const moveImgClass = {
  boy: {
    ArrowUp: ["playerBoyUpFirstMoviment", "playerBoyUpSecondMoviment"],
    ArrowDown: ["playerBoyDownFirstMoviment", "playerBoyDownSecondMoviment"],
    ArrowLeft: ["playerBoyLeftFirstMoviment", "playerBoyLeftSecondMoviment"],
    ArrowRight: ["playerBoyRightFirstMoviment", "playerBoyRightSecondMoviment"],
  },
  girl: {
    ArrowUp: ["playerGirlUpFirstMoviment", "playerGirlUpSecondMoviment"],
    ArrowDown: ["playerGirlDownFirstMoviment", "playerGirlDownSecondMoviment"],
    ArrowLeft: ["playerGirlLeftFirstMoviment", "playerGirlLeftSecondMoviment"],
    ArrowRight: [
      "playerGirlRightFirstMoviment",
      "playerGirlRightSecondMoviment",
    ],
  },
};

const userStyle = (user) =>
  ` position: absolute; top: ${user.y}px; left: ${user.x}px;color:black;display:flex; flex-direction:column; align-items: center; z-index:10000;`;

function renderUI() {
  canvas.innerHTML = `
      ${Object.keys(users)
        .map((userId) => {
          const user = users[userId];
          const { userCharacter, lastKey, clickCount } = user;

          const isStarted = lastKey == "" ? "ArrowDown" : lastKey;

          const playerImg = moveImgClass[userCharacter][isStarted][clickCount];
          return `
          <div  class="player" style="${userStyle(user)}">
            <div class="nameTagContainer">
              <p class="nameTag" alt="nome do player" title="${
                user.userName
              }">${user.userName}</p>
              <div class="triangulo"/>
              </div>
              <div class="player ${playerImg} " ></div>
            </div>
          </div>
        `;
        })
        .join("")}
    `;
}
