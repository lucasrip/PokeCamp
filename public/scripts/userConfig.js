const characters = document?.querySelectorAll(".character");
const userName = document?.getElementById("name");

const submitUser = document?.getElementById("submitUser");
const choiceScreen = document?.getElementById("userConfigContainer");
const gameScreen = document?.getElementById("gameScreenContainer");

const userConfig = {
  userName: "",
  userCharacter: "",
};

userName?.addEventListener(
  "change",
  () => (userConfig.userName = userName.value)
);

characters?.forEach((character) =>
  character?.addEventListener("click", () => {
    if (character.alt == "treinador") {
      changeSelectedPlayer("boy", character, 1);
    } else {
      changeSelectedPlayer("girl", character, 0);
    }
  })
);



function changeSelectedPlayer(player, playerImg, indexPlayer) {
  playerImg.style.filter = " drop-shadow(0 0 0.75rem crimson)";
  userConfig.userCharacter = player;
  characters[indexPlayer].style.filter = "none";
}
