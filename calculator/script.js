const input = document.getElementById("input");
const output = document.getElementById("output");
const signOutput = document.getElementById("sign");

const submit = document.getElementById("equalBtn");

var inputValue = {
  inputOne: "",
  inputTwo: "",
  enableInput: "inputOne",
  initialize: false,
  isToggle: false,
  method: "",
  sign: "",
  process: function (a) {
    if (this.enableInput == "inputOne" && this.isToggle == false) {
      this.inputOne += a;
    } else {
      this.inputTwo += a;
    }
  },
};

const inputVal = inputValue;

var eventListener = document.addEventListener("click", (r) => {
  const inputVal = inputValue;
  const path = r.path[0].id;
  const number = [
    "zeroBtn",
    "oneBtn",
    "twoBtn",
    "threeBtn",
    "fourBtn",
    "fiveBtn",
    "sixBtn",
    "sevenBtn",
    "eightBtn",
    "nineBtn",
  ];
  const signBtn = ["sumBtn", "subBtn", "mutiBtn", "divisionBtn", "equalBtn"];

  number.forEach((a, b) => {
    if (path == a) {
      inputVal.process(b.toString());
      console.table({
        inputVal,
      });
    }
  });
  signBtn.forEach((a) => {
    if (path == a) {
      calMethod(a, inputVal);
    }
  });

  output.innerText = inputVal.inputOne;
  input.innerText = inputVal.inputTwo;
  signOutput.innerText = inputVal.sign;
});

function calMethod(a, b) {
  if (b.isToggle == false || b.initialize != true) {
    switch (a) {
      case "sumBtn":
        b.method = "add";
        b.sign = "+";
        break;
      case "subBtn":
        b.method = "subtract";
        b.sign = "-";
        break;
      case "mutiBtn":
        b.method = "multiply";
        b.sign = "*";
        break;
      case "divisionBtn":
        b.method = "divide";
        b.sign = "/";
        break;

      default: {
        console.log("none");
      }
    }
    b.isToggle = true;
    b.enableInput = "inputTwo";
    b.initialize = true;
  } else {
    if (a == "equalBtn" && b.inputTwo != "") {
      b.isToggle = false;
      switch (b.method) {
        case "add":
          b.inputOne = calculate(
            parseInt(b.inputOne),
            parseInt(b.inputTwo)
          ).add;
          break;
        case "subtract":
          b.inputOne = calculate(
            parseInt(b.inputOne),
            parseInt(b.inputTwo)
          ).subtract;
          break;
        case "multiply":
          b.inputOne = calculate(
            parseInt(b.inputOne),
            parseInt(b.inputTwo)
          ).multiply;
          break;
        case "divide":
          b.inputOne = calculate(
            parseInt(b.inputOne),
            parseInt(b.inputTwo)
          ).divide;
          break;

        default: {
          console.log("none");
        }
      }
      b.inputTwo = "";
      b.method = "";
      b.sign = "";
    } else {
      console.log("not");
    }
  }
}

function calculate(a, b) {
  return {
    inputOne: a,
    inputTwo: b,
    add: a + b,
    subtract: a - b,
    multiply: a * b,
    divide: a / b,
  };
}

function clearAll() {
  inputVal.inputOne = "";
  inputVal.inputTwo = "";
  inputVal.enableInput = "inputOne";
  inputVal.isToggle = false;
  inputVal.initialize = false;
  inputVal.method = "";
  inputVal.sign = "";
}
