const resetBtn = document.querySelector("#reset");
const deleteBtn = document.querySelector("#del");
const equalsBtn = document.querySelector("#equals");
const prevOperandInput = document.querySelector("#prevOperand");
const currentOperandInput = document.querySelector("#currentOperand");
const operands = document.querySelectorAll(".num");
const operatorBtn = document.querySelectorAll(".operator");
let prevOperand = prevOperandInput.innerText;
let currentOperand = currentOperandInput.innerText;
let operation;

const reset = () => {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
};

const deleteOperand = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

const addNum = (num) => {
  if (num === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + num.toString();
};

const operationSelection = (operate) => {
  if (currentOperandInput === "") return;
  if (prevOperandInput !== "") {
    calcOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
};

const calcOperation = () => {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) reset;

  switch (operation) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "*":
      result = prev * current;
      break;

    case "/":
      result = prev / current;
      break;

    default:
      return;
  }
  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandInput.innerText = "";
};

const displayNum = () => {
  currentOperandInput.innerText = currentOperand.toLocaleString("en");
  if (operation !== undefined) {
    prevOperandInput.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    prevOperandInput.innerText = prevOperand;
  }
};

// Event Listeners
resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNum(operand.innerText);
    displayNum();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerText);
    displayNum();
  });
});

equalsBtn.addEventListener("click", () => {
  calcOperation();
  displayNum();
});
