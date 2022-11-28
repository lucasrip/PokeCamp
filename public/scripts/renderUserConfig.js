const showUserSettigs = document.querySelector(".aboutUser");
const description = document.querySelector(".userDescription");

const userBtn = document.getElementById("userSettingsBtn");
const aboutBtn = document.getElementById("aboutGameBtn");

const aboutContainer = document.querySelector(".aboutGameDescription");
const userDescription = document.querySelector(".aboutUserDescription");

const showPlayers = document.querySelector(".players");
const showChat = document.querySelector(".chat");

const btnPlayers = document.querySelector(".chatOptions .btnPlayers");
const btnChat = document.querySelector(".chatOptions .btnChat");

function renderUserConfig(user) {
  showUserSettigs.style.display = "flex";

  description.innerHTML = `
  <div>
     <strong>
        Nome:
     </strong>
     <p class="userNameConfig">
     ${user.userName}
     </p>
  </div>
  <div>
    <strong>
     personagem:
    </strong>
    <p>
     ${user.userCharacter}
    </p>
  </div>
  <div>
    <strong>
     xp atual:
    </strong>
    <p id="currentXp">
     0xp
    </p>
  </div>
  <div>
  <strong>
   xp para o proximo nivel:
  </strong>
  <p id="necessaryXpToNextLevel">
   50xp
  </p>
</div>
<div class="userLevel">
<strong>
   level:
</strong>
<p id="currentLevel">
 1
</p>
<div class="progressBar">
 <div class="currentProgressBar">
 </div>
</div>
<strong>
  nextLevel:
</strong>
<p id="nextLevel">
 2
</p>
</div>
  `;
}

btnPlayers.addEventListener("click", () =>
  controllDisplay(showPlayers, showChat, true)
);
btnChat.addEventListener("click", () =>
  controllDisplay(showChat, showPlayers, true)
);

aboutBtn.addEventListener("click", () =>
  controllDisplay(aboutContainer, userDescription)
);

userBtn.addEventListener("click", () =>
  controllDisplay(userDescription, aboutContainer)
);

function controllDisplay(btn, btnNone, isChat = false) {
  const containerDisplay = btn.style.display;
  const showElement = containerDisplay === "none" || containerDisplay === "";

  if (showElement) {
    btnNone.style.display = "none";
    btn.style.display = "flex";
  } else {
    if (isChat) return;
    btn.style.display = "none";
  }
}
