// Create the pain diary form and table when the page loads.
function createPage() {
    const form = document.createElement("form");
    form.id = "entry-form";

    const dateLabel = createFieldLabel("Date", "date");
    const dateInput = createInput("date", "date");
    dateLabel.appendChild(dateInput);

    const timeLabel = createFieldLabel("Time", "time");
    const timeInput = createInput("time", "time");
    timeLabel.appendChild(timeInput);

    const nrsLabel = createFieldLabel("NRS", "nrs");
    const nrsSelect = createNrsSelect();
    nrsLabel.appendChild(nrsSelect);

    const measureLabel = createFieldLabel("Measure", "measure");
    const measureInput = createInput("text", "measure");
    measureLabel.appendChild(measureInput);

    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.id = "add-entry";
    addButton.textContent = "add entry";

    form.appendChild(dateLabel);
    form.appendChild(timeLabel);
    form.appendChild(nrsLabel);
    form.appendChild(measureLabel);
    form.appendChild(addButton);

    const table = document.createElement("table");
    table.id = "entry-table";
    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    document.body.appendChild(form);
    document.body.appendChild(table);

    addEmptyRow(tableBody);
    addEmptyRow(tableBody);

    // Transfer the form values to the first empty table row.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (form.checkValidity() === false) {
            form.reportValidity();
            return;
        }

        addEntry(tableBody, dateInput.value, timeInput.value,
            nrsSelect.value, measureInput.value);
        form.reset();
        ensureTwoEmptyRows(tableBody);
    });
}

// Create and style the label around one form field.
function createFieldLabel(labelText, fieldId) {
    const label = document.createElement("label");
    label.htmlFor = fieldId;
    label.appendChild(document.createTextNode(labelText));
    return label;
}

// Create a text, date, or time input field.
function createInput(inputType, inputId) {
    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.name = inputId;
    input.required = true;
    return input;
}

// Create the numeric rating scale dropdown with values from 0 to 10.
function createNrsSelect() {
    const select = document.createElement("select");
    select.id = "nrs";
    select.name = "nrs";
    select.required = true;

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "";
    emptyOption.disabled = true;
    emptyOption.selected = true;
    select.appendChild(emptyOption);

    for (let value = 0; value <= 10; value++) {
        const option = document.createElement("option");
        option.value = String(value);
        option.textContent = String(value);
        select.appendChild(option);
    }

    return select;
}

// Add an empty six-column row to the table.
function addEmptyRow(tableBody) {
    const row = document.createElement("tr");

    for (let column = 0; column < 6; column++) {
        const cell = document.createElement("td");
        row.appendChild(cell);
    }

    tableBody.appendChild(row);
}

// Find an empty row and fill it with the submitted values.
function addEntry(tableBody, dateValue, timeValue, nrsValue, measureValue) {
    const rows = tableBody.querySelectorAll("tr");

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];

        if (row.textContent.trim() === "") {
            const cells = row.querySelectorAll("td");
            cells[0].textContent = dateValue;
            cells[1].textContent = timeValue;
            cells[2].textContent = nrsValue;
            cells[4].textContent = measureValue;
            return;
        }
    }

    addEmptyRow(tableBody);
    addEntry(tableBody, dateValue, timeValue, nrsValue, measureValue);
}

// Keep exactly two empty table rows available for new entries.
function ensureTwoEmptyRows(tableBody) {
    const rows = tableBody.querySelectorAll("tr");
    let emptyRowCount = 0;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        if (rows[rowIndex].textContent.trim() === "") {
            emptyRowCount++;
        }
    }

    while (emptyRowCount < 2) {
        addEmptyRow(tableBody);
        emptyRowCount++;
    }
}

document.addEventListener("DOMContentLoaded", createPage);
