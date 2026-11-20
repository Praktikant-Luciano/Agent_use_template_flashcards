const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");

// Prevents empty submissions and clears the form after a valid submission.
function addWordPair(event) {
    event.preventDefault();

    const englishWord = englishInput.value.trim();
    const germanWord = germanInput.value.trim();

    if (englishWord === "" || germanWord === "") {
        return;
    }

    wordForm.reset();
}

wordForm.addEventListener("submit", addWordPair);