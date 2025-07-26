
    const overthinkingThoughts = [
   "Did I say something wrong?",
   "What if I mess up?",
   "What was I doing again?",
   "What if it’s the wrong path?",
    "Did I say something wrong?",
     "What if I mess up?",
       "What was I doing again?",
       "What if it’s the wrong path?",
    ];

    
    function showThought() {
      const thought = overthinkingThoughts[Math.floor(Math.random() * overthinkingThoughts.length)];
      const bubble = document.getElementById("thoughts");
      bubble.textContent = thought;
      
   
      bubble.style.left = Math.random() * (window.innerWidth - 220) + "px";
      bubble.style.top = Math.random() * (window.innerHeight - 100) + "px";
      
      bubble.classList.add("show");
      
      setTimeout(() => {
        bubble.classList.remove("show");
      }, 3000);
    }
    setInterval(showThought, 2500);



    document.addEventListener('DOMContentLoaded', function() {
      console.log("Game starting...");
      
      const container = document.querySelector('.maze-container');
      const cells = Array.from(container.children);
      const width = 10;
      let playerIndex = 0; 

      console.log(`Found ${cells.length} cells`);

      function drawPlayer() {
        
        cells.forEach(cell => cell.classList.remove('player'));
      
        cells[playerIndex].classList.add('player');
        console.log(`Player moved to cell ${playerIndex}`);
      }

      function movePlayer(direction) {
        let nextIndex = playerIndex;

        // Calculer la prochaine position selon la direction
        if (direction === 'ArrowUp' && playerIndex - width >= 0) {
          nextIndex = playerIndex - width;
        }
        else if (direction === 'ArrowDown' && playerIndex + width < cells.length) {
          nextIndex = playerIndex + width;
        }
        else if (direction === 'ArrowLeft' && playerIndex % width !== 0) {
          nextIndex = playerIndex - 1;
        }
        else if (direction === 'ArrowRight' && (playerIndex + 1) % width !== 0) {
          nextIndex = playerIndex + 1;
        }


        if (nextIndex !== playerIndex && !cells[nextIndex].classList.contains('wall')) {
          playerIndex = nextIndex;
          drawPlayer();
          
      
          if (cells[playerIndex].classList.contains('exit')) {
            setTimeout(() => {
              alert("🎉 u made it !");
               window.location.href = "maze2.html";
            
              playerIndex = 0;
              drawPlayer();
            }, 200);
          }
        }
      }

   
      document.addEventListener('keydown', (e) => {
        console.log(`Key pressed: ${e.key}`);
        movePlayer(e.key);
   
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      });

   
      drawPlayer();
      showThought();
    });
