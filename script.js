const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
const groundhogImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Groundhog-Standing2.jpg/640px-Groundhog-Standing2.jpg";

startBtn.addEventListener('click', () => {
    screens[0].classList.add('up');
    setTimeout(createGroundhog, 1000);
    startGame();
});

function startGame() {
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createGroundhog() {
    const groundhog = document.createElement('div');
    groundhog.classList.add('groundhog');
    const { x, y } = getRandomLocation();
    groundhog.style.top = `${y}px`;
    groundhog.style.left = `${x}px`;
    groundhog.innerHTML = `<img src="${groundhogImg}" alt="groundhog" style="transform: rotate(${Math.random() * 360}deg)" />`;

    groundhog.addEventListener('click', catchGroundhog);
    gameContainer.appendChild(groundhog);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchGroundhog() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addGroundhogs();
}

function addGroundhogs() {
    setTimeout(createGroundhog, 1000);
    setTimeout(createGroundhog, 1500);
}

function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}
