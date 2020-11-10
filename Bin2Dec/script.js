// Bin2Dec

const binaryInput = document.getElementById("binary");
const decimalOutput = document.getElementById("binToDec");

function bin2Dec(dec) {
  if (dec === "") {
    alert("please enter the binary number");
    decimalOutput.innerText = "";
  }

  var num = dec.split("");
  var powers = [];
  var sum = 0;
  var numlength = num.length;

  num.map((char) => {
    if (char != "0" && char != "1") {
      alert("please enter the binary number");
    }
  });
  for (var i = 0; i < num.length; i++) {
    powers.push(i);
  }
  for (var i = powers.length - 1; i >= 0; i--) {
    sum += Math.pow(2, i) * num[numlength - i - 1];
  }
  decimalOutput.innerText = sum;
  return sum;
}

// Convert Button

document
  .getElementById("convertBtn")
  .addEventListener("click", convertBtnOnClick);

function convertBtnOnClick() {
  bin2Dec(binaryInput.value);
}
