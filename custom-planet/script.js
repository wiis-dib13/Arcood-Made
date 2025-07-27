document.addEventListener('DOMContentLoaded', () => {
    let currentTexture = 'none';
    let planetElement = document.getElementById('planet');
    let planetSurface = document.getElementById('planetSurface');

    function randomizeColor() {
        const cosmicColors = [
            ['#ff6b6b', '#ee5a24'],
            ['#4834d4', '#686de0'],
            ['#ff9ff3', '#f368e0'],
            ['#54a0ff', '#2e86de'],
            ['#5f27cd', '#341f97'],
            ['#00d2d3', '#01a3a4'],
            ['#ff6348', '#ff3838'],
            ['#c44569', '#f8b500'],
            ['#40407a', '#2c2c54'],
            ['#00d8d6', '#55efc4']
        ];

        const randomGradient = cosmicColors[Math.floor(Math.random() * cosmicColors.length)];
        planetElement.style.background = `linear-gradient(45deg, ${randomGradient[0]}, ${randomGradient[1]})`;
        planetElement.style.boxShadow = `0 0 50px ${randomGradient[0]}40`;
        document.getElementById('planetColor').value = randomGradient[0];
    }

    document.getElementById('planetColor').addEventListener('input', function(e) {
        const color = e.target.value;
        const darkerColor = adjustBrightness(color, -20);
        planetElement.style.background = `linear-gradient(45deg, ${color}, ${darkerColor})`;
        planetElement.style.boxShadow = `0 0 50px ${color}40`;
    });

    function adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    function setTexture(texture) {
        document.querySelectorAll('.texture-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        currentTexture = texture;

        const textures = {
            'none': '',
            'rocky': 'radial-gradient(circle at 30% 30%, #8b4513 20%, #a0522d 40%, #654321 60%, #8b4513 80%)',
            'gas': 'repeating-linear-gradient(45deg, #ff6b35 0px, #ff6b35 20px, #f7931e 20px, #f7931e 40px, #ff8c42 40px, #ff8c42 60px)',
            'ice': 'radial-gradient(circle at 40% 40%, #ffffff 10%, #e6f3ff 30%, #b3d9ff 50%, #87ceeb 70%)',
            'lava': 'radial-gradient(circle at 20% 80%, #ff4500 10%, #ff0000 30%, #8b0000 50%, #654321 70%, #ff4500 90%)',
            'desert': 'linear-gradient(30deg, #daa520 25%, #cd853f 25%, #cd853f 50%, #daa520 50%, #daa520 75%, #cd853f 75%)'
        };

        planetSurface.style.background = textures[texture];
        planetSurface.style.opacity = texture === 'none' ? '0' : '0.8';
    }

    function updateSize(size) {
        planetElement.style.width = size + 'px';
        planetElement.style.height = size + 'px';
        document.getElementById('sizeValue').textContent = size + 'px';

        const atmosphere = document.getElementById('atmosphere');
        const glow = document.getElementById('glow');
        atmosphere.style.width = (parseInt(size) + 20) + 'px';
        atmosphere.style.height = (parseInt(size) + 20) + 'px';
        glow.style.width = (parseInt(size) + 40) + 'px';
        glow.style.height = (parseInt(size) + 40) + 'px';
    }

    function setRotation(direction) {
        planetElement.classList.remove('rotating-cw', 'rotating-ccw');
        if (direction === 'cw') {
            planetElement.classList.add('rotating-cw');
        } else if (direction === 'ccw') {
            planetElement.classList.add('rotating-ccw');
        }
    }
    document.querySelector('.texture-btn').classList.add('active');

    window.randomizeColor = randomizeColor;
    window.setTexture = setTexture;
    window.updateSize = updateSize;
    window.setRotation = setRotation;

    document.querySelectorAll('.decor-icon').forEach(icon => {
        icon.addEventListener('click', function () {
            const decorName = this.dataset.decor;
            const decorImg = document.createElement('img');
            decorImg.src = `./assets/${decorName}.png`;
            decorImg.className = 'planet-decoration';

            // Random position on planet
            const x = Math.random() * 60 + 20;
            const y = Math.random() * 60 + 20;
            decorImg.style.left = `${x}%`;
            decorImg.style.top = `${y}%`;
            document.querySelector('.planet-wrapper').appendChild(decorImg);
        });
    });

});

function placeMoon(name) {
    const planet = document.getElementById("planet");
    const wrapper = document.querySelector(".planet-wrapper");
    const moon = document.createElement("img");
    moon.src = `./assets/${name}.png`;
    moon.classList.add("moon-icon");

    // Ensure the wrapper is relatively positioned
    wrapper.style.position = "relative";

    // Get planet position and size
    const planetRect = planet.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const centerX = planet.offsetLeft + planet.offsetWidth / 2;
    const centerY = planet.offsetTop + planet.offsetHeight / 2;
    const radius = planet.offsetWidth / 2;

    // Random angle around the planet
    const angle = Math.random() * 2 * Math.PI;
    const distance = radius + 30 + Math.random() * 30; // Place it 30–60px outside

    const x = centerX + distance * Math.cos(angle) - 20; // 20 = icon size / 2
    const y = centerY + distance * Math.sin(angle) - 20;

    moon.style.position = "absolute";
    moon.style.left = `${x}px`;
    moon.style.top = `${y}px`;

    wrapper.appendChild(moon);
}

function toggleEffect(name) {
    const planet = document.getElementById("planet");
    const wrapper = document.querySelector(".planet-wrapper");
    const moon = document.createElement("img");
    moon.src = `./assets/${name}.png`;
    moon.classList.add("moon-icon");

    // Ensure the wrapper is relatively positioned
    wrapper.style.position = "relative";

    // Get planet position and size
    const planetRect = planet.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const centerX = planet.offsetLeft + planet.offsetWidth / 2;
    const centerY = planet.offsetTop + planet.offsetHeight / 2;
    const radius = planet.offsetWidth / 2;

    // Random angle around the planet
    const angle = Math.random() * 2 * Math.PI;
    const distance = radius + 30 + Math.random() * 30; // Place it 30–60px outside

    const x = centerX + distance * Math.cos(angle) - 20; // 20 = icon size / 2
    const y = centerY + distance * Math.sin(angle) - 20;

    moon.style.position = "absolute";
    moon.style.left = `${x}px`;
    moon.style.top = `${y}px`;

    wrapper.appendChild(moon);

}

