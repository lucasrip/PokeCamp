const players = document.querySelector(".players");

function renderPlayrsOnline(users) {
  players.innerHTML = `
      ${Object.keys(users)
        .map((userId) => {
          const user = users[userId];

          return `
          <div>
           <strong>
            Nome:
           </strong>
           <p class="playerName">
            ${user.userName}
           </p>
           <strong>
           Level:
           </strong>
           <p>
           ${user.level}
           </p>  
          </div>
        `;
        })
        .join("")}
    `;
}
