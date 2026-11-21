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
function addEntry(tableBody, dateValue, timeValue, nrsValue, measureValue, noteValue) {
    const rows = tableBody.querySelectorAll("tr");

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];

        if (row.textContent.trim() === "") {
            const cells = row.querySelectorAll("td");
            cells[0].textContent = dateValue;
            cells[1].textContent = timeValue;
            cells[2].textContent = nrsValue;
            addNrsWarning(cells[2], Number(nrsValue));
            addPainBar(cells[3], Number(nrsValue));
            cells[4].textContent = measureValue;
            cells[5].textContent = noteValue;
            return;
        }
    }

    addEmptyRow(tableBody);
    addEntry(tableBody, dateValue, timeValue, nrsValue, measureValue, noteValue);
}

// Show the NRS score as a colored bar whose width matches the score.
function addPainBar(cell, nrsValue) {
    const track = document.createElement("div");
    const fill = document.createElement("div");
    track.className = "pain-bar-track";
    fill.className = "pain-bar-fill";
    fill.style.width = (nrsValue * 10) + "%";
    fill.setAttribute("role", "img");
    fill.setAttribute("aria-label", "NRS " + nrsValue + " out of 10");

    if (nrsValue <= 3) {
        fill.classList.add("pain-bar-green");
    } else if (nrsValue <= 6) {
        fill.classList.add("pain-bar-orange");
    } else {
        fill.classList.add("pain-bar-red");
    }

    track.appendChild(fill);
    cell.appendChild(track);
}

// Add a warning triangle when the NRS score is higher than 3.
function addNrsWarning(cell, nrsValue) {
    if (nrsValue <= 3) {
        return;
    }

    const warning = document.createElement("span");
    warning.className = "nrs-warning";
    warning.setAttribute("role", "img");
    warning.setAttribute("aria-label", "Warning: NRS above 3");
    cell.appendChild(warning);
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

// Set the date to today or yesterday using the selected shortcut.
function setDateFromShortcut(dateInput, dayOffset) {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    dateInput.value = year + "-" + month + "-" + day;
}

// Set the time field to the current local time.
function setTimeFromShortcut(timeInput) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    timeInput.value = hours + ":" + minutes;
}

// Handle date and time shortcuts without interfering with text entry.
function setupKeyboardShortcuts(dateInput, timeInput) {
    document.addEventListener("keydown", function (event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) {
            return;
        }

        const focusedElement = document.activeElement;
        const isTyping = focusedElement.matches(
            "textarea, select, input:not([type='date']):not([type='time']), [contenteditable='true']"
        );
        if (isTyping) {
            return;
        }

        const key = event.key.toLowerCase();
        if (key === "h") {
            setDateFromShortcut(dateInput, 0);
        } else if (key === "g") {
            setDateFromShortcut(dateInput, -1);
        } else if (key === "j") {
            setTimeFromShortcut(timeInput);
        } else {
            return;
        }

        event.preventDefault();
    });
}

// Connect the add-entry button to the table.
function setupEntryForm() {
    const form = document.querySelector("#entry-form");
    const tableBody = document.querySelector("#entry-table-body");
    const dateInput = document.querySelector("#date");
    const timeInput = document.querySelector("#time");
    const nrsSelect = document.querySelector("#nrs");
    const measureInput = document.querySelector("#measure");
    const noteInput = document.querySelector("#note");

    setupKeyboardShortcuts(dateInput, timeInput);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (form.checkValidity() === false) {
            form.reportValidity();
            return;
        }

        addEntry(tableBody, dateInput.value, timeInput.value,
            nrsSelect.value, measureInput.value, noteInput.value);
        form.reset();
        ensureTwoEmptyRows(tableBody);
    });
}

document.addEventListener("DOMContentLoaded", setupEntryForm);
