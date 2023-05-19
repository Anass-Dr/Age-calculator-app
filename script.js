"use strict";

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const inputsInfo = document.querySelectorAll(".error-info");
const formControls = document.querySelectorAll(".form-control");
const submitBtn = document.getElementById("submit-btn");
const outputs = document.querySelectorAll(".output span");
let isValid = true;

const showError = (i, msg) => {
  formControls[i].classList.add("error");
  inputsInfo[i].textContent = msg;
  isValid = false;
};

function checkDateFields(d, m, y) {
  // First Check :
  [d, m, y].forEach((value, idx) => {
    if (!value) {
      showError(idx, "This field is required !");
    }
  });

  if (!isValid) return false;

  // Next Check :
  if (d > 31 || d < 1) showError(0, "Must be a valid day");
  if (m > 12 || d < 1) showError(1, "Must be a valid month");
  if (y > new Date().getFullYear()) showError(2, "Must be in the past");

  if (!isValid) return false;

  // Last Check :
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    inputsInfo[0].textContent = "Must be a valid Date";
    formControls.forEach((item) => item.classList.add("error"));
    isValid = false;
  }
}

function resetFields() {
  inputsInfo.forEach((field) => (field.textContent = ""));
  formControls.forEach((item) => item.classList.remove("error"));
  isValid = true;
}

function calcAge(d, m, y) {
  const age = new Date() - new Date(y, m - 1, d);
  const nbOfYears = age / (1000 * 60 * 60 * 24 * 365);
  const years = Math.floor(nbOfYears);
  const nbOfMonths = (nbOfYears - years) * 12;
  const months = Math.floor(nbOfMonths);
  const nbOfDays = (nbOfMonths - months) * 24;
  const days = Math.floor(nbOfDays);
  return [years, months, days];
}

function displayNumber(item, n) {
  const numberInterval = setInterval(() => item.textContent++, 1000 / n);
  setTimeout(clearInterval, 1000, numberInterval);
}

submitBtn.addEventListener("click", () => {
  let result;
  const day = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;
  resetFields();
  checkDateFields(day, month, year);
  if (!isValid) return;
  result = calcAge(day, month, year);
  outputs.forEach((output, idx) => {
    output.textContent = 0;
    displayNumber(output, result[idx]);
  });
});
