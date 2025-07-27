const tasks = [
  "Draw a self-portrait using your non-dominant hand, eyes closed.",
  "Text someone “I forgive you” — with no context.",
  "Send your friend a photo of your elbow and say “It’s time.”",
  "Make a fashion outfit inspired by the last emoji you used.",
  "Write your full name like it’s your ship name with your crush.",
  "Set your ex's name as your Wi-Fi network.",
  "Leave a love note in a library book that says “we almost met.”",
  "Take a selfie with the weirdest object in your room.",
  "Set a 30-second timer and name everything that gives you hope.",
  "Sit in total darkness and pretend to reset your brain.",
  "Balance a spoon on your nose and whisper: “Equilibrium.”",
  "Record yourself saying “I am not from this planet.”",
  "Print a picture of yourself and write “Missing” at the top.",
  "Make a tiny time capsule with trash and deep quotes.",
  "Send your bestie a picture of your hand and say, “Still waiting to be held.”",
  "Paint a face on a boiled egg and name it your nemesis.",
  "Make a dish called “This Is Fine” using 3 weird snacks.",
  "Turn a blanket into a cape. Strike 3 heroic poses.",
  "Wear sunglasses + a bathrobe and pretend you’re famous.",
  "Change outfits and introduce yourself as your alter ego.",
  "Try to moonwalk while brushing your teeth.",
  "Read a recipe like it’s a confession.",
  "Announce every item you touch like a museum guide.",
  "Record yourself giving a speech to your lost dreams.",
  "Declutter your digital files."
];

document.getElementById("generateBtn").addEventListener("click", () => {
  const row1 = document.getElementById("row1");
  const row2 = document.getElementById("row2");

  // Clear previous tasks
  row1.innerHTML = "";
  row2.innerHTML = "";

  // Shuffle and pick 5 tasks
  const shuffled = tasks.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  // Helper function to create and animate task box
  const createTaskBox = (task, delay) => {
    const div = document.createElement("div");
    div.className = "task-box";
    div.textContent = task;
    div.style.animationDelay = `${delay}s`;
    return div;
  };

  // Add to row1
  selected.slice(0, 3).forEach((task, i) => {
    const div = createTaskBox(task, i * 0.2);
    row1.appendChild(div);
  });

  // Add to row2
  selected.slice(3).forEach((task, i) => {
    const div = createTaskBox(task, (i + 3) * 0.2);
    row2.appendChild(div);
  });
});
