const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const pugDimensions = { width: 339 * 1.2, height: 735 * 1.2 };


const levels = {
    5: "Praktikant",
    10: "Anfänger",
    20: "Mitglied",
    30: "hoffentlich ein Girl",
    60: "Ehrenwertes Mitglied",
    100: "Premium Mitglied",
    125: "Saufkompane",
    150: "Geistig Gestörter",
    250: "wirklich Geistig Gestörter",
    450: "Verrückter",
    650: "Verrückter mit Herz",
    1000: "Verrückter mit Herz und Zeit",
    1500: "Zeit-Buddy",
    2500: "Friend",
    3500: "Best Friend",
    4500: "Best Friend for Ever",
    10500: "Girlfriend",
    20500: "Familien Mitglied",
    30500: "deine Mutter",
}

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./meme.png";

const loopingPugs = 60; // 125 pugs required to cover a full 4K television screen. Tested via Firefox DevTools
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 2000

const mouseOffset = {
    x: 0,
    y: 0
}

const movementOffset = {
    x: 0,
    y: 0
}

image.onload = () => {
    startLooping();
};

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
    context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

    let currentPercentage = (loopingPugs - loopCount) / loopingPugs
    context.drawImage(
        image,
        -pugDimensions.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
        -pugDimensions.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
        pugDimensions.width + offset,
        pugDimensions.height + offset
    );
}

function onMouseMove(e) {
    mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
    mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
    return start*(1-amount)+end*amount
}

function loopDraw() {

    movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
    movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

    for (let i = loopingPugs; i >= 1; i--) {
        draw(i * offsetDistance + currentOffset, i);
    }

    draw(offsetDistance, 1);

    currentOffset++;
    if (currentOffset >= offsetDistance) {
        currentOffset = 0;
    }

    const newTime = Math.floor((Date.now() - startTime) / 1000);

    secondsCount.innerText = newTime;

    if(levels[newTime]) {
        level.innerText = levels[newTime]
    }

    requestAnimationFrame(loopDraw);
}

function startLooping() {
    requestAnimationFrame(loopDraw);
}