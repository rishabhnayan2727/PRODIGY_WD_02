// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function displayTime() {
    const display = document.getElementById('display');
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(3, '0');

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startPause() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            displayTime();
        }, 10);
        document.getElementById('startPause').textContent = 'Pause';
    } else {
        clearInterval(timer);
        document.getElementById('startPause').textContent = 'Start';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    displayTime();
    document.getElementById('startPause').textContent = 'Start';
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    laps.push(elapsedTime);
    const lapsList = document.getElementById('laps');
    const li = document.createElement('li');
    li.textContent = laps.length + '. ' + display.textContent;
    lapsList.prepend(li);
}

document.getElementById('startPause').addEventListener('click', startPause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
