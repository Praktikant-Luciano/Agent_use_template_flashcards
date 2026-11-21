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

// Sort entries by date and then time, from oldest to newest.
function sortEntriesChronologically(entries) {
    entries.sort(function (firstEntry, secondEntry) {
        const firstDateTime = firstEntry.date + "T" + firstEntry.time;
        const secondDateTime = secondEntry.date + "T" + secondEntry.time;
        return firstDateTime.localeCompare(secondDateTime);
    });
}

// Rebuild the table from entries in their current chronological order.
function displayEntries(tableBody, entries) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
        const entry = entries[entryIndex];
        addEntry(tableBody, entry.date, entry.time, String(entry.nrs),
            entry.measure, entry.note);
    }
    ensureTwoEmptyRows(tableBody);
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
    if (nrsValue <= 6) {
        warning.classList.add("nrs-warning-orange");
    } else {
        warning.classList.add("nrs-warning-red");
    }
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

// Save all submitted entries in the browser.
function saveEntries(entries) {
    localStorage.setItem("painDiaryEntries", JSON.stringify(entries));
}

// Load saved entries and keep only valid entries.
function loadEntries() {
    const savedEntries = localStorage.getItem("painDiaryEntries");

    if (savedEntries === null) {
        return [];
    }

    try {
        const entries = JSON.parse(savedEntries);
        if (Array.isArray(entries) === false) {
            return [];
        }

        return entries.filter(function (entry) {
            const nrsValue = Number(entry.nrs);
            return entry.date && entry.time && entry.measure && entry.note &&
                Number.isInteger(nrsValue) && nrsValue >= 0 && nrsValue <= 10;
        });
    } catch (error) {
        return [];
    }
}

// Summarize the number and NRS values of the current entries.
function updateEntrySummary(entries) {
    const countElement = document.querySelector("#entry-count");
    const minimumElement = document.querySelector("#nrs-minimum");
    const maximumElement = document.querySelector("#nrs-maximum");
    const meanElement = document.querySelector("#nrs-mean");

    if (entries.length === 0) {
        countElement.textContent = "0";
        minimumElement.textContent = "-";
        maximumElement.textContent = "-";
        meanElement.textContent = "-";
        return;
    }

    let minimum = Number(entries[0].nrs);
    let maximum = Number(entries[0].nrs);
    let total = 0;

    for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
        const nrsValue = Number(entries[entryIndex].nrs);
        if (nrsValue < minimum) {
            minimum = nrsValue;
        }
        if (nrsValue > maximum) {
            maximum = nrsValue;
        }
        total = total + nrsValue;
    }

    const mean = total / entries.length;
    countElement.textContent = String(entries.length);
    minimumElement.textContent = String(minimum);
    maximumElement.textContent = String(maximum);
    meanElement.textContent = mean.toFixed(2);
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
    const entries = loadEntries();

    sortEntriesChronologically(entries);
    saveEntries(entries);
    setupKeyboardShortcuts(dateInput, timeInput);

    displayEntries(tableBody, entries);
    updateEntrySummary(entries);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (form.checkValidity() === false) {
            form.reportValidity();
            return;
        }

        const nrsValue = Number(nrsSelect.value);
        if (Number.isInteger(nrsValue) === false || nrsValue < 0 || nrsValue > 10) {
            return;
        }

        const entry = {
            date: dateInput.value,
            time: timeInput.value,
            nrs: nrsValue,
            measure: measureInput.value,
            note: noteInput.value
        };

        entries.push(entry);
        sortEntriesChronologically(entries);
        saveEntries(entries);
        displayEntries(tableBody, entries);
        form.reset();
        updateEntrySummary(entries);
    });
}

document.addEventListener("DOMContentLoaded", setupEntryForm);
