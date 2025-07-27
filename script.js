const avatarImg = document.getElementById("avatarImg");
    const rpsImg = document.getElementById("rpsImg");
    const cardsContainer = document.getElementById("cards");
    const playButton = document.getElementById("playButton");

    const characterImage = localStorage.getItem("characterImage");

    if (!characterImage) {
      alert("No avatar selected!");
      window.location.href = "next.html";
    }

    avatarImg.src = characterImage;

    const rpsOptions = [
  { name: "rock", src: "images/stone.png" },
  { name: "paper", src: "images/scroll.png" },
  { name: "scissor", src: "images/scissors (1).png" }
];
 // replace with your actual file names
    let playCount = 0;

    window.onload = () => {
      alert("Your friend is bored and wants to play rock, paper, scissors. Keep it entertained. Click play to begin. You will get 5 chances");
      cardsContainer.style.opacity = 1;

      rpsImg.src = "images/stone.png";
        rpsImg.classList.add("show");
    };
    playButton.onclick = () => {
        if (playCount >= 5) {
            alert("You are done!");
            playButton.disabled = true;
            window.location.href = "nextpage.html";
            return;
        }

        // Fade out both cards
        rpsImg.classList.remove("show");
        rpsImg.classList.add("fade");

        const msgBox = document.getElementById("rockMessage");
        msgBox.classList.remove("show");
    
    const compliments = {
        paper: [
            "You're soft, but you smother like a pro 💌",
            "You're the gentle strength I never knew I needed.",
            "You give 'calm energy but can crush my soul' vibes 💅"
        ],
        scissor: [
            "You're sharp, bold, and dangerously stylish ✂️",
            "Cutting-edge, darling. Just like your energy.",
            "You slay. Literally. 🔪✨"
        ]
    };

    setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * rpsOptions.length);
    const selected = rpsOptions[randomIndex];

    rpsImg.src = selected.src;

    let messageText = "";
    const song = document.getElementById("twinSong");

    if (selected.name === "rock") {
      messageText = "TWIN?! WHERE HAVE YOU BEEN!! 💥👯‍♀️💖";

      if (song) {
        song.currentTime = 0;
        song.play().catch(err => console.log("Audio play blocked:", err));
      }
    } else {
      const pool = compliments[selected.name];
      messageText = pool[Math.floor(Math.random() * pool.length)];

      if (song) {
        song.pause();
        song.currentTime = 0;
      }
    }

    // Fade-in new state
    msgBox.textContent = messageText;
    msgBox.classList.add("show");

    rpsImg.classList.remove("fade");

    rpsImg.classList.add("show");

    playCount++;

  }, 400);
};