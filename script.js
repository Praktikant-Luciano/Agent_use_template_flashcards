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
        listItem.textContent =
            wordPairs[index].english + " - " + wordPairs[index].german;
        wordList.appendChild(listItem);
    }
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