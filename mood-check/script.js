let iconInterval = null; // So we can control it later
let emojiInterval = null;

const yesBtn = document.getElementById("yesBtn");

function startShower() {
  const icons = [
    "./assets/cat1.png",
    "./assets/cat2.png",
    "./assets/froggy1.png",
    "./assets/froggy2.png",
    "./assets/froggy3.png",
    "./assets/froggy4.png",
    "./assets/juice.png",
    "./assets/popsicle.png"
  ];

  const interval = setInterval(() => {
    const icon = document.createElement("img");
    icon.src = icons[Math.floor(Math.random() * icons.length)];
    icon.classList.add("falling-icon");

    icon.style.left = Math.random() * 100 + "vw";
    icon.style.animationDelay = Math.random() * 0.5 + "s";

    document.body.appendChild(icon);

    // Remove after fall + fade
    setTimeout(() => {
      icon.remove();
    }, 4000);
  }, 300);
}

yesBtn.addEventListener("click", () => {
  startShower();
});
