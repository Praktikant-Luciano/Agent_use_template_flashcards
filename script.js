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

// Connect the add-entry button to the table.
function setupEntryForm() {
    const form = document.querySelector("#entry-form");
    const tableBody = document.querySelector("#entry-table-body");
    const dateInput = document.querySelector("#date");
    const timeInput = document.querySelector("#time");
    const nrsSelect = document.querySelector("#nrs");
    const measureInput = document.querySelector("#measure");

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

document.addEventListener("DOMContentLoaded", setupEntryForm);
