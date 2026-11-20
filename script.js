const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const wordList = document.getElementById("word-list");
let wordPairs = [];

// Displays all word pairs from the current list.
function showWordPairs() {
    wordList.innerHTML = "";

    if (wordPairs.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "Noch keine Wortpaare.";
        wordList.appendChild(emptyItem);
        return;
    }

    for (let index = 0; index < wordPairs.length; index++) {
        const listItem = document.createElement("li");
        const pairText = document.createElement("span");
        pairText.textContent =
            wordPairs[index].english + " - " + wordPairs[index].german;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Löschen";
        deleteButton.addEventListener("click", function () {
            deleteWordPair(index);
        });

        listItem.appendChild(pairText);
        listItem.appendChild(deleteButton);
        wordList.appendChild(listItem);
    }
}

// Removes the selected word pair and shows the updated list.
function deleteWordPair(index) {
    wordPairs.splice(index, 1);
    showWordPairs();
}

// Prevents empty submissions and clears the form after a valid submission.
function addWordPair(event) {
    event.preventDefault();

    const englishWord = englishInput.value.trim();
    const germanWord = germanInput.value.trim();

    if (englishWord === "" || germanWord === "") {
        return;
    }

    wordPairs.push({
        english: englishWord,
        german: germanWord
    });

    wordForm.reset();
    showWordPairs();
}

wordForm.addEventListener("submit", addWordPair);
showWordPairs();