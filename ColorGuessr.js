const colorBlock = document.getElementById("colorBlock");
const colorResultBlock = document.getElementById("colorResultBlock");
const streakText = document.getElementById('streakText');
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const colorBlockValues = {};
let redValue = red.value;
let greenValue = green.value;
let blueValue = blue.value;

affectResultColor();
generateRandomColor();

function generateRandomColor() {
  let r = generateRandomInt(0, 255);
  let g = generateRandomInt(0, 255);
  let b = generateRandomInt(0, 255);
  colorBlockValues["red"] = r;
  colorBlockValues["green"] = g;
  colorBlockValues["blue"] = b;

  colorBlock.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function generateRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

red.oninput = function () {
  redValue = red.value;
  affectResultColor();
};
green.oninput = function () {
  greenValue = green.value;
  affectResultColor();
};
blue.oninput = function () {
  blueValue = blue.value;
  affectResultColor();
};

function affectResultColor() {
  colorResultBlock.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function submit() {
    const rScore = calculateScore(redValue, colorBlockValues['red']);
    const gScore = calculateScore(greenValue, colorBlockValues['green']);
    const bScore = calculateScore(blueValue, colorBlockValues['blue']);
    const totalScore = (rScore + gScore + bScore) / 3;

    if (totalScore > 80) {
      let streak = parseInt(streakText.innerHTML);
      streak++;
      streakText.innerHTML = streak;
    }

    const rP = document.createElement('p');
    const gP = document.createElement('p');
    const bP = document.createElement('p');
    const totalP = document.createElement('p');
    rP.innerHTML = "red score: " + rScore + "%";
    gP.innerHTML = "green score: " + gScore + "%";
    bP.innerHTML = "blue score: " + bScore + "%";
    totalP.innerHTML = "total score: " + totalScore.toFixed(2) + "%";

    colorResultBlock.innerHTML = '';
    colorResultBlock.appendChild(rP);
    colorResultBlock.appendChild(gP);
    colorResultBlock.appendChild(bP);
    colorResultBlock.appendChild(totalP);
}

function calculateScore(sliderValue, targetValue) {
    const diff = Math.abs(parseFloat(sliderValue) - targetValue);

    const maxDiff = 255;
    const score = ((maxDiff - diff) / maxDiff) * 100;
    const formattedScore = parseFloat(score.toFixed(2));

    return Math.max(0, Math.min(100, formattedScore));
}