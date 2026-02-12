let score = 0;
let level = 1;
let current = "";
let realCurrent = "";
let alive = false;

const letterDiv = document.getElementById("letter");
const scoreDiv = document.getElementById("score");

function randomLetters() {
  const letters = ["S", "L"];
  const count = level === 1 ? (Math.random() < 0.5 ? 1 : 2) : 2;

  let result = "";
  for (let i = 0; i < count; i++) {
    result += letters[Math.floor(Math.random() * 2)];
  }
  return result;
}

function maybeFake(real) {
  if (level < 2) return real;

  // 30% chance to fake
  if (Math.random() < 0.3) {
    let fake;
    do {
      fake = randomLetters();
    } while (fake === real);
    return fake;
  }
  return real;
}

function correctKey(seq) {
  switch (seq) {
    case "S": return "s";
    case "L": return "l";
    case "SS": return "l";
    case "LL": return "s";
    case "SL":
    case "LS": return " ";
  }
}

function nextRound() {
  realCurrent = randomLetters();
  current = maybeFake(realCurrent);
  letterDiv.textContent = current;
}

function levelUp() {
  level = 2;
  letterDiv.textContent = "⚠️ LEVEL 2 ⚠️";
  scoreDiv.textContent = "Warning: visuals may lie";
  setTimeout(() => {
    scoreDiv.textContent = `Score: ${score} | Level: 2`;
    nextRound();
  }, 1200);
}

function startGame() {
  score = 0;
  level = 1;
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

  if (e.key === correctKey(realCurrent)) {
    score++;

    if (score === 15 && level === 1) {
      levelUp();
      return;
    }

    scoreDiv.textContent = `Score: ${score} | Level: ${level}`;
    nextRound();
  } else {
    gameOver();
  }
});


