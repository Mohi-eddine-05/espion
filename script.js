let currentPlayer = 0;
let shuffledPlayers = [];
let spyIndices = [];
let selectedWord = "";

function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  const spyCount = parseInt(document.getElementById("spyCount").value);

  if (playerCount < 3 || spyCount >= playerCount) {
    alert("تحقق من عدد اللاعبين والجواسيس.");
    return;
  }

  // Mélanger les indices des joueurs
  shuffledPlayers = Array.from({ length: playerCount }, (_, i) => i);
  shuffledPlayers.sort(() => Math.random() - 0.5);

  // Choisir un mot aléatoire
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  selectedWord = WORDS[randomIndex];

  // Choisir les espions de façon aléatoire parmi les indices (et non en se basant sur l'ordre des joueurs)
  spyIndices = [];
  while (spyIndices.length < spyCount) {
    const rand = Math.floor(Math.random() * playerCount);
    if (!spyIndices.includes(rand)) {
      spyIndices.push(rand);
    }
  }

  // Afficher la section de jeu
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("wordDisplay").textContent = "مرر الهاتف للاعب رقم 1 واضغط التالي";
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("restartBtn").style.display = "none";
  currentPlayer = 0;
}

function showNextPlayer() {
  if (currentPlayer < shuffledPlayers.length) {
    // Afficher l'écran de transition
    document.getElementById("game").style.display = "none";
    document.getElementById("transitionScreen").style.display = "block";
  } else {
    document.getElementById("wordDisplay").textContent = "🎉 تم توزيع الأدوار!";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}

function revealWord() {
  const playerNumber = currentPlayer + 1;
  const isSpy = spyIndices.includes(shuffledPlayers[currentPlayer]);

  // Afficher le mot ou le message d'espion
  document.getElementById("wordDisplay").textContent =
    `اللاعب ${playerNumber}: ` + (isSpy ? "❓ أنت الجاسوس!" : `🔐 الكلمة: ${selectedWord}`);

  // Afficher la zone du jeu et cacher la transition
  document.getElementById("game").style.display = "block";
  document.getElementById("transitionScreen").style.display = "none";

  currentPlayer++;
}

function restartGame() {
  document.getElementById("setup").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("transitionScreen").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("wordDisplay").textContent = "...";
  document.getElementById("nextBtn").style.display = "inline-block";

  // Réinitialiser les variables globales
  currentPlayer = 0;
  shuffledPlayers = [];
  spyIndices = [];
  selectedWord = "";
}
