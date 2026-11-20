const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const wordList = document.getElementById("word-list");
const mainContent = document.querySelector("main");
const storageKey = "wordPairs";
let wordPairs = [];
let isGermanVisible = false;
let practiceCard;

// Loads saved word pairs from localStorage when the page starts.
function loadWordPairs() {
    const savedPairs = localStorage.getItem(storageKey);

    if (savedPairs === null) {
        return;
    }

    const parsedPairs = JSON.parse(savedPairs);
    if (!Array.isArray(parsedPairs)) {
        throw new Error("Gespeicherte Wortpaare sind ungueltig.");
    }

    wordPairs = parsedPairs;
}

// Saves the current word pairs in localStorage.
function saveWordPairs() {
    localStorage.setItem(storageKey, JSON.stringify(wordPairs));
}

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
    saveWordPairs();
    showWordPairs();
    isGermanVisible = false;
    showPracticeCard();
}

// Creates a practice section with a clickable flashcard.
function createPracticeMode() {
    const practiceSection = document.createElement("section");
    const practiceHeading = document.createElement("h2");
    practiceCard = document.createElement("button");

    practiceHeading.textContent = "Üben";
    practiceCard.type = "button";
    practiceCard.addEventListener("click", togglePracticeAnswer);
    practiceSection.appendChild(practiceHeading);
    practiceSection.appendChild(practiceCard);
    mainContent.appendChild(practiceSection);
}

// Shows the English word, or the German word after the card is clicked.
function showPracticeCard() {
    if (wordPairs.length === 0) {
        practiceCard.textContent = "Noch keine Wortpaare zum Üben.";
        practiceCard.disabled = true;
        return;
    }

    practiceCard.disabled = false;
    practiceCard.textContent = isGermanVisible
        ? wordPairs[0].german
        : wordPairs[0].english;
}

// Reveals or hides the German answer on the practice card.
function togglePracticeAnswer() {
    isGermanVisible = !isGermanVisible;
    showPracticeCard();
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

    saveWordPairs();
    wordForm.reset();
    showWordPairs();
    isGermanVisible = false;
    showPracticeCard();
}

wordForm.addEventListener("submit", addWordPair);
loadWordPairs();
showWordPairs();
createPracticeMode();
showPracticeCard();