let score = 0;
let current = "";
let alive = false;

const letterDiv = document.getElementById("letter");
const scoreDiv = document.getElementById("score");

function randomLetters() {
  const letters = ["S", "L"];
  const count = Math.random() < 0.5 ? 1 : 2;

  let result = "";
  for (let i = 0; i < count; i++) {
    result += letters[Math.floor(Math.random() * 2)];
  }
  return result;
}

function correctKey() {
  switch (current) {
    case "S": return "s";
    case "L": return "l";
    case "SS": return "l";
    case "LL": return "s";
    case "SL":
    case "LS": return " ";
  }
}

function nextRound() {
  current = randomLetters();
  letterDiv.textContent = current;
}

function startGame() {
  score = 0;
  alive = true;
  scoreDiv.textContent = "Score: 0";
  letterDiv.textContent = "GO";
  setTimeout(nextRound, 400);
}

function gameOver() {
  alive = false;
  letterDiv.textContent = "💀";
}

document.addEventListener("keydown", (e) => {
  if (!alive) {
    if (e.key === " ") startGame();
    return;
  }

  if (!["s", "l", " "].includes(e.key)) return;

  if (e.key === correctKey()) {
    score++;
    scoreDiv.textContent = `Score: ${score}`;
    nextRound();
  } else {
    gameOver();
  }
});
