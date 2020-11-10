const topLeftValue = document.getElementById("topleft");
const topRightValue = document.getElementById("topright");
const botLeftValue = document.getElementById("botleft");
const botRightValue = document.getElementById("botright");
const borderCode = document.getElementById("cssCode");
const prototypeBorder = document.getElementById("prototype");

function generateCode() {
  borderCode.value = `border-radius: ${topLeftValue.value}px ${topRightValue.value}px ${botLeftValue.value}px ${botRightValue.value}px;`;
}

function replaceBorder() {
  prototypeBorder.style.borderRadius = `${topLeftValue.value}% ${topRightValue.value}% ${botLeftValue.value}% ${botRightValue.value}%`;
}

document.getElementById("generateBtn").addEventListener("click", generateCode);
