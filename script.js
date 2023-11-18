document.addEventListener("DOMContentLoaded", function () {
    const memoryGame = document.getElementById("memoryGame");
    const resetButton = document.getElementById("resetButton");
    let cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let flippedCards = [];
    let matchedCards = [];
    let firstFlippedCard = null;

    cards = shuffleArray(cards);

    cards.forEach((value, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.textContent = value;
        card.addEventListener("click", flipCard);
        memoryGame.appendChild(card);
    });

    resetButton.addEventListener("click", resetGame);

    function flipCard() {

        const clickedCard = this;

        if (!flippedCards.includes(clickedCard) && flippedCards.length < 2) {
            clickedCard.classList.add("flipped");
            flippedCards.push(clickedCard);

            if (flippedCards.length === 1) {
                firstFlippedCard = clickedCard;
                firstFlippedCard.timer = setTimeout(() => {
                    firstFlippedCard.classList.remove("flipped");
                    flippedCards = [];
                    firstFlippedCard = null;}, 2000);
            } else if (flippedCards.length === 2) {
                clearTimeout(firstFlippedCard.timer);
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.textContent === card2.textContent) {
            setTimeout(() => {
                card1.classList.add("matched");
                card2.classList.add("matched");
                matchedCards.push(card1, card2);
                checkWin()}, 200)
            
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped")}, 750)
        }

        flippedCards = [];
        firstFlippedCard = null;
    }

    function checkWin() {
        if (matchedCards.length === cards.length) {
            alert("Congratulations! You've matched all the cards!");
            resetGame();
        }
    }

    function resetGame() {
        memoryGame.innerHTML = "";
        cards = shuffleArray(cards);
        flippedCards = [];
        matchedCards = [];
        firstFlippedCard = null;

        cards.forEach((value, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            card.textContent = value;
            card.addEventListener("click", flipCard);
            memoryGame.appendChild(card);
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
