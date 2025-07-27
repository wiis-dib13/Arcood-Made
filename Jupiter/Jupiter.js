
    let Count = 0;
    const glassImage = document.querySelector('.glass img');
    const button = document.querySelector('#mix-button button');

    function adding() {
        Count++;

        if (Count === 1) {
            glassImage.src = 'assets/img2.png';
            button.innerText = 'Add Syrup';
        } 
        else if (Count === 2) {
            glassImage.src = 'assets/img3.png';
            button.innerText = 'Add soda';
        } 
        else if (Count === 3) {
            glassImage.src = 'assets/img4.png';
            button.innerText = 'Add Glitters!';
        } 
        else if (Count === 4) {
            glassImage.src = 'assets/img5.png';
            button.innerText = 'Drink is ready!';
        }
        else if(Count === 5){
            glassImage.src = 'assets/img1.png';
            button.innerText = 'Once Again!';
            Count = 0;
        }
        
    }

