const moleTile = document.getElementById("moleTile");
const scoreDisplay = document.getElementById("score");

let score = 0;
let lastIndex = -1;

const molePositions = [
  { x: 10, y: window.innerHeight * 0.36 },
  { x: 680, y: window.innerHeight * 0.36 },
  { x: 360, y: window.innerHeight * 0.46 },
  { x: 760, y: window.innerHeight * 0.72 },
  { x: 960, y: window.innerHeight * 0.46 }
];

function getNewRandomIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * molePositions.length);
  } while (newIndex === lastIndex);
  lastIndex = newIndex;
  return newIndex;
}

function showMole() {
  moleTile.style.display = "none";
  setTimeout(() => {
    const index = getNewRandomIndex();
    const pos = molePositions[index];
    moleTile.style.left = `${pos.x}px`;
    moleTile.style.top = `${pos.y}px`;
    moleTile.style.display = "block";
  }, 200);
}

moleTile.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moleTile.style.display = "none";
});

const startBtn = document.getElementById("start-btn");
const startPopup = document.getElementById("start-popup");

startBtn.addEventListener("click", () => {
  startPopup.style.display = "none";

  showMole();
  setInterval(showMole, 1000);
});


const reticle = document.getElementById("reticle-cursor");

document.addEventListener("mousemove", (e) => {
  reticle.style.left = `${e.clientX}px`;
  reticle.style.top = `${e.clientY}px`;
});




