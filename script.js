let currentPlayer = 0;
let wordToGuess = "";
let spyIndices = [];

function startGame() {
  const totalPlayers = parseInt(document.getElementById("playerCount").value);
  const requestedSpyCount = parseInt(document.getElementById("spyCount").value);
  const spyCount = Math.max(1, Math.min(requestedSpyCount, totalPlayers - 1));
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  // choisir les espions
  spyIndices = [];
  while (spyIndices.length < spyCount) {
    const index = Math.floor(Math.random() * totalPlayers);
    if (!spyIndices.includes(index)) {
      spyIndices.push(index);
    }
  }

  wordToGuess = randomWord;
  currentPlayer = 0;
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  showNextPlayer();
}

function showNextPlayer() {
  const totalPlayers = parseInt(document.getElementById("playerCount").value);
  if (currentPlayer >= totalPlayers) {
    document.getElementById("wordDisplay").innerHTML = "✅ تم توزيع الأدوار، ابدأوا بالنقاش!";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  document.getElementById("wordDisplay").innerHTML = `👤 اللاعب ${currentPlayer + 1}، اضغط لرؤية كلمتك`;
  document.getElementById("nextBtn").onclick = () => showWord(currentPlayer);
}

function showWord(index) {
  const isSpy = spyIndices.includes(index);
  document.getElementById("wordDisplay").innerHTML = isSpy
    ? "🕵️‍♂️ أنت الجاسوس!"
    : `🔑 كلمتك هي: <strong>${wordToGuess}</strong>`;

  document.getElementById("nextBtn").onclick = () => {
    currentPlayer++;
    showNextPlayer();
  };
}
