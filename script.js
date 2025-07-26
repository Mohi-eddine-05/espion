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

  // Choisir les espions
  spyIndices = shuffledPlayers.slice(0, spyCount);

  // Choisir un mot aléatoire
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  selectedWord = WORDS[randomIndex];

  // Afficher la section de jeu
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("wordDisplay").textContent = "مرر الهاتف للاعب رقم 1 واضغط التالي";
  currentPlayer = 0;
}

function showNextPlayer() {
  const playerNumber = currentPlayer + 1;

  if (currentPlayer < shuffledPlayers.length) {
    const isSpy = spyIndices.includes(shuffledPlayers[currentPlayer]);

    document.getElementById("wordDisplay").textContent =
      `اللاعب ${playerNumber}: ` + (isSpy ? "❓ أنت الجاسوس!" : `🔐 الكلمة: ${selectedWord}`);

    currentPlayer++;
  }

  // Quand tous les joueurs ont vu leur rôle
  if (currentPlayer === shuffledPlayers.length) {
    document.getElementById("wordDisplay").textContent = "🎉 تم توزيع الأدوار!";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
  }
}


function restartGame() {
  // Réinitialiser les variables
  currentPlayer = 0;
  shuffledPlayers = [];
  spyIndices = [];
  selectedWord = "";

  // Réinitialiser les affichages
  document.getElementById('setup').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  document.getElementById('wordDisplay').textContent = '...';

  // Réinitialiser les boutons
  document.getElementById('nextBtn').style.display = 'inline-block';
  document.getElementById('restartBtn').style.display = 'none';
}

