document.addEventListener("DOMContentLoaded", function () {
  const fullQuestions = [
    { text: "You always catch him staring.", points: 10 },
    { text: "He remembers the little things you say.", points: 9 },
    { text: "You keep dreaming about him.", points: 7 },
    { text: "You both made eye contact while laughing.", points: 8 },
    { text: "Your zodiac signs are compatible.", points: 6 },
    { text: "He liked your IG story.", points: 5 },
    { text: "He asked if you're seeing someone.", points: 15 },
    { text: "A random psychic TikTok said 'this is for YOU if your crush is [first letter of his name]'", points: 11 },
    { text: "He stood kinda close to you in the group photo.", points: 6 },
    { text: "You got Love in FLAMES.", points: 12 },
    { text: "You accidentally wore matching shirt colors.", points: 10 },
    { text: "His friend teased him when you walked by.", points: 9 },
    { text: "You both said the same thing at the same time.", points: 8 },
    { text: "Your friend said he asked about you once.", points: 12 },
    { text: "He remembers your birthday without Facebook.", points: 12 },
    { text: "He laughs even when your joke wasn’t funny.", points: 6 },
    { text: "He offered you food from his lunch.", points: 13 },
    { text: "You accidentally touched hands and he didn’t flinch.", points: 6 },
    { text: "You walked by and the convo suddenly changed.", points: 10 },
    { text: "He listens to your rants like it’s a podcast.", points: 8 }
  ];

  const questions = fullQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  let current = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const pointsEl = document.getElementById("points");
  const meterEl = document.getElementById("meter");
  const resultEl = document.getElementById("result");
  const finalMessageEl = document.getElementById("finalMessage");
  const resultImage = document.getElementById("resultImage");
  const tarotCard = document.getElementById("tarot-card");

  function swipe(direction) {
    if (direction === "right") {
      tarotCard.style.transform = "translateX(120px) rotate(10deg)";
      setTimeout(() => {
        tarotCard.style.transform = "translateX(0)";
        answer(true);
      }, 400);
    } else {
      tarotCard.style.transform = "translateX(-120px) rotate(-10deg)";
      setTimeout(() => {
        tarotCard.style.transform = "translateX(0)";
        answer(false);
      }, 400);
    }
  }

  function answer(isYes) {
    if (current >= questions.length) return;

    if (isYes) {
      score += questions[current].points;
    }

    current++;

    if (current < questions.length) {
      questionEl.textContent = questions[current].text;
      pointsEl.textContent = `+${questions[current].points} delulu points`;
      meterEl.textContent = `Delulu Meter: ${score}`;
    } else {
      showResult();
    }
  }

  function showResult() {
    const deluluMeter = score;

    const highDeluluPhrases = [
      "Girl… he is might not that into you.",
      "Delulu is your soulmate, not him.",
      "You manifested this… but the universe said 'try again'",
      "Reality called. It said \"move on\".",
      "You are not inlove, you are in delulu.",
      "Sis, you wrote a whole Wattpad plot in your head.",
      "Deluluniverse has chosen you as its ambassador"
    ];

    const softDeluluPhrases = [
      "You might be in love… and not even delulu about it.",
      "Wow, no delusions detected. Therapist would be proud.",
      "Not totally hopeless, I guess.",
      "Looks like you are in love... responsibly.",
      "Keep it lowkey, but you're winning.",
      "Delulu-free and thriving. How mature of you.",
      "You are giving main character, not hallucination."
    ];

    const resultText = deluluMeter >= 50
      ? highDeluluPhrases[Math.floor(Math.random() * highDeluluPhrases.length)]
      : softDeluluPhrases[Math.floor(Math.random() * softDeluluPhrases.length)];

    resultEl.classList.remove("hidden");
    document.querySelector(".card-area").classList.add("hidden");
    document.querySelector(".meter-container").classList.add("hidden");

    if (deluluMeter >= 50) {
      const hypnoDiv = document.getElementById("hypnoticResult");
      hypnoDiv.classList.remove("hidden");
      hypnoDiv.innerHTML = `
        ${resultText}
        <img src="images/hypnotic-wheel.svg" class="hypnotic-wheel spin" alt="Hypnotic Wheel" />
      `;
    } else {
      const softDiv = document.getElementById("softResult");
      softDiv.classList.remove("hidden");
      softDiv.textContent = resultText;
    }
  }

  questionEl.textContent = questions[current].text;
  pointsEl.textContent = `+${questions[current].points} delulu points`;
  meterEl.textContent = `Delulu Meter: ${score}`;
  
  window.swipe = swipe;
  
  document.getElementById("restartBtn").addEventListener("click", function () {
  location.reload();
});

});
