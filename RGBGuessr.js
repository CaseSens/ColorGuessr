const rgbText = document.getElementById("rgbText");
const streakText = document.getElementById('streakText');
let rgbs = [];
let rightAnswer = generateRandomInt(0, 5);
let streak = 0;

setupGame();

function setupGame() {
  resetJS();
  rightAnswer = generateRandomInt(0, 5);
  generateRandomColors();
  rgbText.innerHTML = '';
  rgbText.innerHTML = `RGB(${rgbsToString(rightAnswer)})`;
  colorBlocks();
}

function generateRandomColors() {
  let i = 6;
  while (i--) {
    let rgb = {};
    let r = generateRandomInt(0, 255);
    let g = generateRandomInt(0, 255);
    let b = generateRandomInt(0, 255);
    rgb["red"] = r;
    rgb["green"] = g;
    rgb["blue"] = b;
    rgbs.push(rgb);
  }
}

function generateRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgbsToString(i) {
  var string = "";
  string += `${rgbs[i]["red"]}, `;
  string += `${rgbs[i]["green"]}, `;
  string += `${rgbs[i]["blue"]}`;

  return string;
}

function colorBlocks() {
  for (let i = 0; i < rgbs.length; i++) {
    const block = document.getElementById(`choice${i + 1}`);
    const r = rgbs[i]['red'];
    const g = rgbs[i]['green'];
    const b = rgbs[i]['blue'];

    block.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

function buttonSelected(num) {
  if (num === rightAnswer) {
    alert('you win!');
    let streak = parseInt(streakText.innerHTML);
    streak++;
    streakText.innerHTML = streak;
    setupGame();
  } else {
    alert('you lose!');
    setupGame();
  }
}

function resetJS() {
  rgbs = [];
  rightAnswer = -1;
}