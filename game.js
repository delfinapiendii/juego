const canvas = document.getElementById('oceano');
const ctx = canvas.getContext('2d');
const puntosElement = document.getElementById('puntos');

const buzoImg = new Image();
buzoImg.src = 'img/diver.png';

const basuraImg = new Image();
basuraImg.src = 'img/botella2.png';


const delfinImg = new Image();
delfinImg.src = 'img/delfin.png';


// --------------------------VARIABLES
let buzo = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 60,
    height: 60,
    speed: 5
};

let basura = [
    { x: 100, y: 100, width: 40, height: 40 },
    { x: 300, y: 200, width: 40, height: 40 },
    { x: 650, y: 500, width: 40, height: 40 },
];

let delfin = [
    { x: 600, y: 100, width: 40, height: 40 },
];

let puntos = 0;

//-------------------------- FUNCIONES

function dibujarDiver() {
    ctx.drawImage(buzoImg, buzo.x, buzo.y, buzo.width, buzo.height);
}

function dibujarBolsa() {
    basura.forEach(item => {
        ctx.drawImage(basuraImg, item.x, item.y, item.width, item.height);
    });
}


function dibujarDelfin() {
    delfin.forEach(item => {
        ctx.drawImage(delfinImg, item.x, item.y, item.width, item.height);
    });
}

// Dibujador de basura, delfines y nuestro buzo
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarDiver();
    dibujarBolsa();
    dibujarDelfin();
}

function encontroBasura() {
    basura.forEach((item, index) => {
        if (buzo.x < item.x + item.width &&
            buzo.x + buzo.width > item.x &&
            buzo.y < item.y + item.height &&
            buzo.y + buzo.height > item.y) {
            basura.splice(index, 1);
            puntos += 10;
            puntosElement.textContent = 'Puntos: ' + puntos;
        }
    });
}

function encontroDelfin() {
    delfin.forEach((item, index) => {
        if (buzo.x < item.x + item.width &&
            buzo.x + buzo.width > item.x &&
            buzo.y < item.y + item.height &&
            buzo.y + buzo.height > item.y) {
            delfin.splice(index, 1);
            puntos += 20;
            puntosElement.textContent = 'Puntos: ' + puntos;
        }
    });
}

function gameLoop() {
    update();
    encontroBasura();
    encontroDelfin();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            buzo.y -= buzo.speed;
            break;
        case 'ArrowDown':
            buzo.y += buzo.speed;
            break;
        case 'ArrowLeft':
            buzo.x -= buzo.speed;
            break;
        case 'ArrowRight':
            buzo.x += buzo.speed;
            break;
    }
});

buzoImg.onload = basuraImg.onload = gameLoop;
