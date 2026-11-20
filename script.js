const nrsSelect = document.querySelector("#nrs-value");
const measureField = document.querySelector("#measure-field");
const measureInput = document.querySelector("#measure-taken");

// Show and require the measure field when the pain level is above 3.
function updateMeasureField() {
  const measureIsNeeded = Number(nrsSelect.value) > 3;
  measureField.hidden = !measureIsNeeded;
  measureInput.required = measureIsNeeded;
}

nrsSelect.addEventListener("change", updateMeasureField);
updateMeasureField();