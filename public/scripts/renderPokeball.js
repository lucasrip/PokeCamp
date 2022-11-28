function spawnPokeball() {
  const mapSize = {
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  };

  const pokeballsImg = {
    pokeball: {
      img: "../public/assets/pokeballs/pokeball.png",
      alt: "pokeball",
    },
    greatball: {
      img: "../public/assets/pokeballs/greatball.webp",
      alt: "greatball",
    },
    masterball: {
      img: "../public/assets/pokeballs/masterball.png",
      alt: "masterball",
    },
  };
  const maxMapLimiteAreaX = mapSize.width - 50;
  const minMapLimiteAreaX = 50;

  const maxMapLimiteAreaY = mapSize.height - 100;
  const minMapLimiteAreaY = 100;

  setInterval(() => {
    const x = getRandomInt(minMapLimiteAreaX, maxMapLimiteAreaX);
    const y = getRandomInt(minMapLimiteAreaY, maxMapLimiteAreaY);

    const decidePokeball = getRandomInt(1, 100);
    let pokeballImg = "";

    decidePokeball >= 1 && decidePokeball <= 70
      ? (pokeballImg = pokeballsImg["pokeball"])
      : "";

    decidePokeball > 70 && decidePokeball <= 90
      ? (pokeballImg = pokeballsImg["greatball"])
      : "";

    decidePokeball > 90 ? (pokeballImg = pokeballsImg["masterball"]) : "";

    const pokeballPosition = (x, y) => ` top:${y}; left:${x};`;
    const pokeballItem = `<img src=${pokeballImg.img} alt=${
      pokeballImg.alt
    } class="pokeballItem" style="${pokeballPosition(x, y)}"/>`;
    pokeArea.innerHTML += pokeballItem;

    setTimeout(() => {
      pokeArea.removeChild(pokeArea.childNodes[0]);
    }, 4400);
  }, 4000);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcPositionUserToPokeball(ballPosition, userPosition, balance) {
  let largerPosition;
  let smallerPosition;

  if (ballPosition > userPosition) {
    largerPosition = ballPosition;
    smallerPosition = userPosition;
  } else {
    largerPosition = userPosition;
    smallerPosition = ballPosition;
  }

  return smallerPosition + balance >= largerPosition;
}

function isGetedPokeball(user) {
  const pokeBalls = document.querySelectorAll(".pokeballItem");
  const pokeballsPoints = {
    pokeball: 5,
    greatball: 10,
    masterball: 20,
  };

  pokeBalls.forEach((pokeball, index) => {
    const ballPositionX = pokeball.getBoundingClientRect().x;
    const ballPositionY = pokeball.getBoundingClientRect().y;

    const positionXisTrue = calcPositionUserToPokeball(
      ballPositionX,
      user.x,
      16
    );
    const positionYisTrue = calcPositionUserToPokeball(
      ballPositionY,
      user.y,
      55
    );

    const conditionTogetPokeball = positionXisTrue && positionYisTrue;

    if (conditionTogetPokeball) {
      xp += pokeballsPoints[pokeball.alt];

      pokeBalls[index].style.display = "none";

      updatUserLevelUI(xp);
    }
  });
}

function updatUserLevelUI(xpValue) {
  const currentLevel = document.getElementById("currentLevel");
  const currentXp = document.getElementById("currentXp");

  const nextLevel = document.getElementById("nextLevel");
  const xpToNextLevel = document.getElementById("necessaryXpToNextLevel");

  const progressBar = document.querySelector(".currentProgressBar");

  const intXpToNextLevel = parseInt(xpToNextLevel.innerText.replace("xp", ""));
  const intCurrentXp = parseInt(currentXp.innerText.replace("xp", ""));
  const intNextLevel = parseInt(nextLevel.innerText);

  let calcCurrentProgress = 100 * (xpValue / intXpToNextLevel);

  progressBar.style.width = `${calcCurrentProgress}%`;

  currentXp.innerText = `${xpValue}xp`;

  if (xpValue >= intXpToNextLevel) {
    const newCurrentValue = intCurrentXp - intXpToNextLevel;

    const valueNextLevel = intNextLevel + 1;

    if (newCurrentValue > 0) {
      currentXp.innerText = newCurrentValue + "xp";
      calcCurrentProgress = 100 * (newCurrentValue / intXpToNextLevel);
      progressBar.style.width = `${calcCurrentProgress}%`;
      xp = newCurrentValue;
    } else {
      currentXp.innerText = "0xp";
      xp = 0;
      progressBar.style.width = "0%";
    }
    currentLevel.innerText = intNextLevel;
    nextLevel.innerText = valueNextLevel;
    xpToNextLevel.innerText = intXpToNextLevel + 25;

    Toastify({
      text: `Parabens voce subiu para o nivel ${intNextLevel}`,
      duration: 2000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        fontSize: "0.9rem",
        background: "green",
      },
    }).showToast();
  }
}
