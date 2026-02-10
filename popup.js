let score = 0;
let level = 1;
let current = "";
let alive = false;
let roundDelay = 700;

const letterDiv = document.getElementById("letter");
const scoreDiv = document.getElementById("score");

function randomLetters() {
  const letters = ["S", "L"];
  const count =
    level === 1
      ? (Math.random() < 0.5 ? 1 : 2)
      : 2; // Level 2 always doubles

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

function levelUp() {
  level = 2;
  roundDelay = 400;
  letterDiv.textContent = "LEVEL 2";
  setTimeout(nextRound, 800);
}

function startGame() {
  score = 0;
  level = 1;
  roundDelay = 700;
  alive = true;

  scoreDiv.textContent = "Score: 0 | Level: 1";
  letterDiv.textContent = "GO";
  setTimeout(nextRound, 500);
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

    if (score === 15 && level === 1) {
      scoreDiv.textContent = `Score: ${score} | Level: 2`;
      levelUp();
      return;
    }

    scoreDiv.textContent = `Score: ${score} | Level: ${level}`;
    setTimeout(nextRound, roundDelay);
  } else {
    gameOver();
  }
});
