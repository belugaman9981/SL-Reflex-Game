let score = 0;
let current = "";
let alive = false;

const letterDiv = document.getElementById("letter");
const scoreDiv = document.getElementById("score");
const hintDiv = document.getElementById("hint");

function randomLetters() {
  const choices = ["S", "L"];
  const count = Math.random() < 0.5 ? 1 : 2;

  if (count === 1) {
    return choices[Math.floor(Math.random() * 2)];
  }

  const first = choices[Math.floor(Math.random() * 2)];
  const second = choices[Math.floor(Math.random() * 2)];
  return first + second;
}

function correctKey() {
  if (current === "S") return "s";
  if (current === "L") return "l";
  if (current === "SS") return "l";
  if (current === "LL") return "s";
  if (current === "SL" || current === "LS") return " ";
}

function nextRound() {
  current = randomLetters();
  letterDiv.textContent = current;
}

function startGame() {
  score = 0;
  alive = true;
  scoreDiv.textContent = "Score: 0";
  hintDiv.textContent = "";
  nextRound();
}
 
function gameOver() {
  alive = false;
  letterDiv.textContent = "oof";
  scoreDiv.textContent = `Score: ${score}`;
  hintDiv.textContent = "try again (press space)";
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
