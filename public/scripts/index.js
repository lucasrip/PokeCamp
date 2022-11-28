const audioIcon = document?.getElementById("audio");
const audio = document?.querySelector("audio");

audioIcon?.addEventListener("click", () => {
  audio.volume = 0.05;
  if (audioIcon.alt === "play") {
    audioIcon.alt = "mute";
    audioIcon.src = audioIcon?.src?.replace("play.png", "mute.png");
    audio.play();
  } else {
    audioIcon.alt = "play";
    audioIcon.src = audioIcon?.src?.replace("mute.png", "play.png");
    audio?.pause();
  }
});

submitUser?.addEventListener("click", () => changeScreen());

function changeScreen() {
  const { userCharacter, userName } = userConfig;

  const isErrors = [
    {
      condition: userCharacter === "",
      message: "voce deve escolher um dos personagem para prosseguir",
    },
    {
      condition: userName === "",
      message: "voce deve escolher um nome ",
    },
    {
      condition: userName.length < 5,
      message: "seu nome deve ter mais que 5 caracteres",
    },
  ];
  const errorsMessage = [];

  const validUserConfig = isErrors.some(({ condition, message }) => {
    if (condition) {
      errorsMessage.push(message);
      return true;
    }
    return false;
  });

  if (validUserConfig) {
    errorsMessage.forEach((errorMessage) => {
      Toastify({
        text: errorMessage,
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          fontSize: "0.9rem",
          background: "red",
        },
      }).showToast();
    });
    return;
  }
  startGame();
}
